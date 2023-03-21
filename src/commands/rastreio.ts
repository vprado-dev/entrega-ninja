import { SlashCommandBuilder } from "@discordjs/builders";
import { fetchTrackingService } from "../services/rastreioService";

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
    console.log(rastreio.eventos);
    return interaction.reply("Pong!");
  },
};

export default rastreio;
