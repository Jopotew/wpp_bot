const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const path = require('path')
const fs = require('fs')


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const menuPrincipalPath = path.join(__dirname, "mensajes", "menu_principal.txt")
const menuAgendaPath = path.join(__dirname, "mensajes", "menu_agenda.txt")
const menuGptPath = path.join(__dirname, "mensajes", "menu_gpt")

const menuPrincipal = fs.readFileSync(menuPrincipalPath, "utf8")
const menuAgenda = fs.readFileSync(menuAgendaPath, "utf8")
const menuGpt = fs.readFileSync(menuGptPath, "utf8") 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Flows de menus //

const flowCrearEvento = addKeyword(EVENTS.ACTION)
    .addAnswer("flow agendar")


const flowConsultarEvento = addKeyword(EVENTS.ACTION)
    .addAnswer("flow Consulta de fecha")


const flowAlarma = addKeyword(EVENTS.ACTION)
    .addAnswer("flow alarma")


const flowConsultarCalendarioSemanal = addKeyword(EVENTS.ACTION)
    .addAnswer("flow Consulta de eventos en el calendario de la semana")


const flowConsultarCalendarioDia = addKeyword(EVENTS.ACTION)
    .addAnswer("flow Consulta de eventos en el calendario del día")


const flowBusquedGpt = addKeyword(EVENTS.ACTION)
    .addAnswer("flow de busqueda en gpt")














//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Flows principales


const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        menuPrincipal,
        { capture: true },
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
            if (!["1", "2", "3", "4", "5", "0"].includes(ctx.body)) {
                return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
                );
            }
        switch (ctx.body) {
            case "1":
                return gotoFlow(flowCrearEvento);
            case "2":
                return gotoFlow(flowConsultarEvento);
            case "3":
                return gotoFlow(flowAlarma);
            case "6":
                return

            }
        }
    )


const menuPrincipalFlow = addKeyword("menu", "menú").addAnswer(
        menuPrincipal,
        { capture: true },
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
            if (!["1", "2", "3", "4", "5", "0"].includes(ctx.body)) {
                return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
                );
            }
        switch (ctx.body) {
            case "1":
                return gotoFlow(flowAgendarEvento);
            case "2":
                return gotoFlow(flowConsultarEvento);
            case "3":
                return gotoFlow(flowAlarma);
            case "6":

            }
        }
    )
    

const agendaFlow = addKeyword("agenda", "agendar", "calendario").addAnswer(
    menuAgenda,
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", "4"].includes(ctx.body)) {
            return fallBack(
            "Respuesta no válida, por favor selecciona una de las opciones."
            );
        }
    switch (ctx.body) {
        case "1":
            return gotoFlow(flowConsultarCalendarioSemanal);
        case "2":
            return gotoFlow(flowConsultarCalendarioDia);
        case "3":
            return gotoFlow(flowCrearEvento);
        case "4":
            pass
        }
    }
)




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowWelcome, menuPrincipalFlow, flowCrearEvento, flowAlarma, flowConsultarEvento])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}









main()
