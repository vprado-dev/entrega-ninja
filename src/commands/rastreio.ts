import { SlashCommandBuilder } from "@discordjs/builders";
import { fetchTrackingServiceV2 } from "../services/rastreioService";
import { trackingEmbedV2 } from "../views/trackingEmbed";
import redis from "../config/redis";

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
    try {
      const codigo = interaction.options.getString("codigo");
      const redisLastUpdate = await redis.get(codigo);
      const lastUpdate = redisLastUpdate
        ? JSON.parse(redisLastUpdate)
        : await fetchTrackingServiceV2(codigo);

      if (
        !lastUpdate.descricao ||
        !lastUpdate.dtHrCriado ||
        !lastUpdate.unidade
      ) {
        return interaction.reply(
          "Parece que seu código expirou, ou não está mais cadastrado no sistema 😢",
        );
      }

      const embed = trackingEmbedV2({
        descricao: lastUpdate.descricao,
        dtHrCriado: lastUpdate.dtHrCriado,
        unidade: lastUpdate.unidade,
        unidadeDestino: lastUpdate.unidadeDestino,
      });

      return interaction.reply({ embeds: [embed] });
    } catch (err: any) {
      console.error(`[#ERROR] ${err.message}`);
    }
  },
};

export default rastreio;
