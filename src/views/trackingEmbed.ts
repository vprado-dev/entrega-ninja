import { format } from "date-fns";
import { EmbedBuilder } from "discord.js";
import { TrackingProps, TrackingPropsV2 } from "../@types/TrackingProps";

enum TipoUnidade {
  TCE = "Unidade de Tratamento",
  CDD = "Unidade de Distribuição",
}

export const trackingEmbed = ({
  descricao,
  dtHrCriado,
  unidade,
  unidadeDestino,
}: TrackingProps) => {
  const date = new Date(dtHrCriado);
  const fields = [
    {
      name: "Estado atual",
      value: `**${descricao}**`,
      inline: false,
    },
    {
      name: "Data",
      value: date.toLocaleDateString("pt-BR"),
      inline: true,
    },
    {
      name: "Horário",
      value: `${format(date, "HH:mm")}`,
      inline: true,
    },
  ];
  if (unidadeDestino) {
    fields.push(
      {
        name: "**Origem**",
        value: `${unidade.tipo} - ${unidade.endereco.cidade} (${unidade.endereco.uf})`,
        inline: false,
      },
      {
        name: "**Destino**",
        value: `${
          TipoUnidade[unidadeDestino.tipo as keyof typeof TipoUnidade]
        } - ${unidade.endereco.cidade} (${unidade.endereco.uf})`,
        inline: false,
      },
    );
  } else {
    fields.push({
      name: "Local",
      value: `${unidade.tipo} - ${unidade.endereco.cidade} (${unidade.endereco.uf})`,
      inline: false,
    });
  }
  const embedReply = new EmbedBuilder().setColor("#ea6329").addFields(fields);

  return embedReply;
};

export const trackingEmbedV2 = ({
  descricao,
  dtHrCriado,
  unidade,
  unidadeDestino,
}: TrackingPropsV2) => {
  const fields = [
    {
      name: "Estado atual",
      value: `**${descricao}**`,
      inline: false,
    },
    {
      name: "Data",
      value: `${dtHrCriado[0]}`,
      inline: true,
    },
    {
      name: "Horário",
      value: `${dtHrCriado[1]}`,
      inline: true,
    },
  ];
  if (unidadeDestino) {
    fields.push(
      {
        name: "**Origem**",
        value: `${unidade}`,
        inline: false,
      },
      {
        name: "**Destino**",
        value: `${unidadeDestino}`,
        inline: false,
      },
    );
  } else {
    fields.push({
      name: "Local",
      value: `${unidade}`,
      inline: false,
    });
  }
  const embedReply = new EmbedBuilder().setColor("#ea6329").addFields(fields);

  return embedReply;
};
