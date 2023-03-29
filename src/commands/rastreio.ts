import { SlashCommandBuilder } from "@discordjs/builders";
import { trackingEmbed } from "../views/trackingEmbed";
import { getLastTrackingEvent } from "../functions/getLastTrackingEvent";

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
    const lastUpdate = await getLastTrackingEvent(codigo);

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
