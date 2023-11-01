
class FinancialCalculator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      
        <form id="calculator-form">
          <label for="amount">Сумма кредита:</label>
          <input type="number" id="amount" name="amount">
          
          <label for="rate">Процентная ставка:</label>
          <input type="number" id="rate" name="rate">
          
          <label for="term">Срок кредита:</label>
          <input type="number" id="term" name="term">
        </form>
        <div id="results">
          <!-- Здесь будут результаты -->
        </div>
      `;

      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', 'financial-calculator.css');
      this.shadowRoot.appendChild(linkElem);
      this.form = this.shadowRoot.querySelector('#calculator-form');
      this.form.addEventListener('input', this.calculate.bind(this));
    }
  
    connectedCallback() {
      console.log('Компонент создан');
    }
  
    disconnectedCallback() {
      console.log('Компонент удален');
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`Атрибут ${name} обновлен`);
      this.calculate();
    }
  
    static get observedAttributes() {
      return ['amount', 'rate', 'term'];
    }
  
    calculate() {
      const amount = parseFloat(this.form.amount.value);
      const rate = parseFloat(this.form.rate.value);
      const term = parseFloat(this.form.term.value);
  
      if (isNaN(amount) || isNaN(rate) || isNaN(term)) {
        return;
      }
  
      const monthlyRate = rate / 100 / 12;
      const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
      const totalPayment = monthlyPayment * term;
      const totalInterest = totalPayment - amount;
  
      this.shadowRoot.querySelector('#results').innerHTML = `
        <p>Ежемесячный платеж: ${monthlyPayment.toFixed(2)}</p>
        <p>Общая сумма: ${totalPayment.toFixed(2)}</p>
        <p>Общий процент: ${totalInterest.toFixed(2)}</p>
      `;
    }
  }
  
  customElements.define('financial-calculator', FinancialCalculator);
  