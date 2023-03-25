import { SlashCommandBuilder } from "@discordjs/builders";
import { TrackingProps } from "../@types/TrackingProps";
import { fetchTrackingService } from "../services/rastreioService";
import { trackingEmbed } from "../views/trackingEmbed";

const rastreio = {
  data: new SlashCommandBuilder()
    .setName("rastreio")
    .setDescription("Rastreia sua encomenda")
    .addStringOption((option) =>
      option
        .setName("codigo")
        .setDescription("O codigo de rastreio da sua encomenda"),
    ),
  async execute(interaction: any) {
    const codigo = interaction.options.getString("codigo");
    const rastreio = await fetchTrackingService(codigo);
    const lastUpdate: TrackingProps = rastreio.eventos.reverse().pop();

    const embed = trackingEmbed({
      descricao: lastUpdate.descricao,
      dtHrCriado: lastUpdate.dtHrCriado,
      unidade: lastUpdate.unidade,
      unidadeDestino: lastUpdate.unidadeDestino,
    });

    return interaction.reply({ embeds: [embed] });
  },
};

export default rastreio;
