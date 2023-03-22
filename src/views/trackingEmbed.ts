import { EmbedBuilder } from "discord.js";
import { TrackingProps } from "../@types/TrackingProps";

export const trackingEmbed = ({
  descricao,
  dtHrCriado,
  unidade,
  unidadeDestino,
}: TrackingProps) => {
  const date = new Date(dtHrCriado);
  console.log(unidadeDestino);
  const fields = [
    {
      name: "Estado atual",
      value: `**${descricao}**`,
    },
    {
      name: "Data",
      value: date.toLocaleDateString("pt-BR"),
      inline: true,
    },
    {
      name: "Horário",
      value: `${date.getHours()}:${date.getMinutes()}`,
      inline: true,
    },
    {
      name: "Local",
      value: `${unidade.tipo} - ${unidade.endereco.cidade} (${unidade.endereco.uf})`,
    },
  ];
  const embedReply = new EmbedBuilder().setColor("#ea6329").addFields(fields);

  return embedReply;
};
