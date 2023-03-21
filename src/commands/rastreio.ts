import { SlashCommandBuilder } from "@discordjs/builders";

const ping = {
  data: new SlashCommandBuilder()
    .setName("rastreio")
    .setDescription("Rastreia sua encomenda")
    .addStringOption((option) =>
      option
        .setName("codigo")
        .setDescription("O codigo de rastreio da sua encomenda"),
    ),
  async execute(interaction: any) {
    return interaction.reply("Pong!");
  },
};

export default ping;
