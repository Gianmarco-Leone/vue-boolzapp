// ? TRACCIA:

// **Milestone 1**
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// ● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
// nome e immagine di ogni contatto

// **Milestone 2**
// ● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
// messaggi relativi al contatto attivo all’interno del pannello della conversazione
// ● Click sul contatto mostra la conversazione del contatto cliccato

// **Milestone 3**
// ● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
// “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// ● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
// un “ok” come risposta, che apparirà dopo 1 secondo.

// **Milestone 4**
// ● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
// contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
// “mar” rimangono solo Marco e Martina)

// **Milestone 5 - opzionale**
// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato
// ● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

// ? SVOLGIMENTO:

// Dichiaro variabile globale per Luxon
const dt = luxon.DateTime;

const app = Vue.createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Hai portato a spasso il cane?",
              status: "sent",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Ricordati di stendere i panni",
              status: "sent",
              dropdown: false,
            },
            {
              date: "10/01/2020 16:15:22",
              text: "Tutto fatto!",
              status: "received",
              dropdown: false,
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              text: "Ciao come stai?",
              status: "sent",
              dropdown: false,
            },
            {
              date: "20/03/2020 16:30:55",
              text: "Bene grazie! Stasera ci vediamo?",
              status: "received",
              dropdown: false,
            },
            {
              date: "20/03/2020 16:35:00",
              text: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
              dropdown: false,
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              text: "La Marianna va in campagna",
              status: "received",
              dropdown: false,
            },
            {
              date: "28/03/2020 10:20:10",
              text: "Sicuro di non aver sbagliato chat?",
              status: "sent",
              dropdown: false,
            },
            {
              date: "28/03/2020 16:15:22",
              text: "Ah scusa!",
              status: "received",
              dropdown: false,
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Si, ma preferirei andare al cinema",
              status: "received",
              dropdown: false,
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Ricordati di chiamare la nonna",
              status: "sent",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Va bene, stasera la sento",
              status: "received",
              dropdown: false,
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "_6",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Ciao Claudia, hai novità?",
              status: "sent",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Non ancora",
              status: "received",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:51:00",
              text: "Nessuna nuova, buona nuova",
              status: "sent",
              dropdown: false,
            },
          ],
        },
        {
          name: "Federico",
          avatar: "_7",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
              dropdown: false,
            },
          ],
        },
        {
          name: "Sofia",
          avatar: "_8",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:50:00",
              text: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
              dropdown: false,
            },
            {
              date: "10/01/2020 15:51:00",
              text: "OK!!",
              status: "received",
              dropdown: false,
            },
          ],
        },
      ],
      newEnterMessageText: "",
      activeContact: 0,
      inputTextSearch: "",
      listReceivedMessageText: [
        "Ok",
        "Si",
        "Tutto bene, tu?",
        "Non posso rispondere",
        "Non ho voglia di parlare",
        "Non ho capito",
        "Perfetto",
      ],
    };
  },
  methods: {
    // **MILESTONE 2**
    changeContact(index) {
      this.activeContact = index;
    },

    // **MILESTONE 3**
    enterMessage() {
      // Creo variabile per recuperare questo esatto momento
      let now = dt
        .now()
        .setLocale("it")
        .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);

      // Creo variabile nuovo messaggio inviato
      let newEnterMessage = {
        date: now,
        text: this.newEnterMessageText,
        status: "sent",
        dropdown: false,
      };

      // Aggiungo il nuovo messaggio all'array dei messaggi del contatto solo se nell'input c'è scritto qualcosa
      if (
        this.newEnterMessageText.length > 0 &&
        this.newEnterMessageText.trim()
      ) {
        this.contacts[this.activeContact].messages.push(newEnterMessage);

        // Creo funzione per la risposta del contatto dopo un secondo
        setTimeout(() => {
          // Aggiorno variabile
          now = dt
            .now()
            .setLocale("it")
            .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);

          // Creo variabile nuovo messaggio ricevuto
          const newReceivedMessage = {
            date: now,
            // Grazie alla funzione che mi ritorna un numero casuale tra un min e un max posso recuperare l'indice casuale dell'array lista di risposte
            text: this.listReceivedMessageText[
              this.generateRandomInt(0, this.listReceivedMessageText.length - 1)
            ],
            status: "received",
            dropdown: false,
          };

          // Aggiungo il nuovo messaggio all'array dei messaggi del contatto
          this.contacts[this.activeContact].messages.push(newReceivedMessage);
        }, 1000);
      }

      // Svuoto l'input dove scrivere il messaggio
      this.newEnterMessageText = "";
    },

    // **MILESTONE 4**
    // Creo funzione che cicla tutti i contatti dell'array contacts, e se trova lettere in comune con il nome inserito nell'input della ricerca accende e/o spegne la variabile visible
    searchContacts() {
      for (contact of this.contacts) {
        if (
          contact.name
            .toLowerCase()
            .includes(this.inputTextSearch.toLowerCase())
        ) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      }
    },

    // **MILESTONE 5**
    // Creo una funzione che accende e/o spegne la variabile "dropdown" all'interno dell'array message a seconda dell'indice che viene passato come parametro
    dropMessage(index) {
      if (this.contacts[this.activeContact].messages[index].dropdown == false) {
        this.contacts[this.activeContact].messages[index].dropdown = true;
      } else if (
        this.contacts[this.activeContact].messages[index].dropdown == true
      ) {
        this.contacts[this.activeContact].messages[index].dropdown = false;
      }
    },

    // Creo funzione che a seconda dell'indice passato come parametro elimina un solo messaggio partendo da quell'indice
    deleteMessage(index) {
      this.contacts[this.activeContact].messages.splice(index, 1);
    },

    // **BONUS 3**
    // Funzione per generare numero randomico tra due numeri
    generateRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  },
});

app.mount("#app");
