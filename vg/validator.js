/**
 * 
 * Objektet FormValidator nedan kommer finnas tillgängligt i din kodfil, och kan användas för att validera formulärdata.
 * 
 * -------- Validaringen måste först förberedas, vilket sker i 3 steg:
 * 
 * 1. Först måste du skapa valideringsfunktioner för varje "felsort" som du har i ditt formulär. En validerings-
 * funktion är en funktion som tar en parameter "value" och returnerar ett felmeddelande ifall värdet bryter
 * mot regeln som funktionen kollar. Om värdet är ok ska funktionen returnera false.
 * 
 * 2. Varje sådan funktion måste sedan registreras i Formvalidator. Det gör du genom att anropa metoden
 * Formvalidator.registerValidator, som registrerar valideringsfunktionen med det angivna namnet.
 * 
 * 3. Nästa steg är att koppla ihop fältnamn med valideringsfunktionsnamn, för att berätta för valideraren att
 * detta fält ska valideras enligt den namngivna valideringsfunktionen. Detta görs genom att anropa metoden
 * Formvalidator.connectValidatorToField. Ett fält kan kopplas ihop med många validatorer, genom att anropa 
 * connectValidatorToField flera gånger med samma fältnamn.
 * 
 * -------- Själva användningen av valideringen går sedan till enligt följande:
 * 
 * A. När användaren submittar formuläret samlar du ihop alla fältvärden i ett särskilt dataobjekt, där 
 * nycklarna är fältnamnen och värdena är motsvarande värde.
 * 
 * B. Anropa sedan Formvalidator.validate med dataobjektet. Du får nu tillbaka en lista med alla felmeddelanden,
 * eller en tom lista om allt var ok.
 * 
 * C. Ifall det fanns fel så måste du visa dessa för användaren. Varje fel representeras av ett felobjekt som
 * innehåller fältets namn i propertyn `fieldName`, och själva felmeddelandet i propertyn `errorMsg`.
 * 
 *
 * -------- Kodexempel på setup (1-3)
 * 
 * // skapa en valideringsfunktion
 * function checkIfBatman(str){
 *   if (str === "Batman") {
 *     return "Batman isn't welcome here anymore!";
 *   }
 * }
 * 
 * // registrera valideringsfunktionen
 * Formvalidator.registerValidator("weDontWantBatman", checkIfBatman);
 * 
 * // koppla ihop valideringsfunktinen med ett fält
 * Formvalidator.connectValidatorToField("weDontWantBatman", "name");
 * 
 * -------- Kodexempel på validering (A-C)
 * 
 * $("#myForm").submit(function(){
 *   const data = {
 *     name: $("#nameInput").val(),
 *     // annan data här också förmodligen
 *   };
 *   const errors = FormValidator.validate(data);
 *   if (errors.length) {
 *     // visa alla fel
 *   }
 *   // övrig submission-kod
 * });
 * 
 */
const FormValidator = {
  validators: {},

  mappings: {},

  registerValidator(validatorName, validatorFunction) {
    this.validators[validatorName] = validatorFunction;
  },

  connectValidatorToField(validatorName, fieldName) {
    if (!this.mappings[fieldName]) {
      this.mappings[fieldName] = [];
    }
    this.mappings[fieldName].push(validatorName);
  },

  validate(data) {
    const errors = [];
    for (let fieldName in data) {
      for (let validatorName of this.mappings[fieldName]) {
        const validator = this.validators[validatorName];
        const fieldValue = data[fieldName];
        const errorMsg = validator(fieldValue);
        if (errorMsg) {
          errors.push({
            fieldName: fieldName,
            errorMsg: errorMsg
          });
        }
      }
    }

    return errors;
  }
}
