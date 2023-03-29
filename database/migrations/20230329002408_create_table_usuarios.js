const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("usuarios", (table) => {
    // fields
    table.increments("usuarioId", { primaryKey: false }).notNullable();
    table.text("usuarioDiscordId").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    //unique
    table.unique(["usuarioDiscordId"]);

    // primary key
    table.primary(["usuarioId"]);
  });

  // triggers
  await knex.schema.raw(`
    create trigger "tr_usuarios_setUpdatedAt"
    before update on usuarios
    for each row
    execute procedure "setUpdatedAt"();
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("usuarios");
};
