const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("encomendas", (table) => {
    //fields
    table.increments("encomendaId", { primaryKey: false }).notNullable();
    table.text("codigoRastreio").notNullable();
    table.integer("usuarioId").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    //unique
    table.unique(["codigoRastreio"]);

    //primary key
    table.primary(["encomendaId"]);

    //foreign key
    table
      .foreign("usuarioId")
      .references("usuarioId")
      .inTable("usuarios")
      .onDelete("no action")
      .onUpdate("cascade");
  });

  // triggers
  await knex.schema.raw(`
    create trigger "tr_encomendas_setUpdatedAt"
    before update on "encomendas"
    for each row
    execute procedure "setUpdatedAt"();
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("encomendas");
};
