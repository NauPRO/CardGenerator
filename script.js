// Función para generar un número de tarjeta de crédito válido con el algoritmo de Luhn
function generateCardNumber(bin, expiryDate, cvv) {
    // Definir el tamaño del número de tarjeta de crédito (por lo general 16 dígitos)
    const length = 16;
  
    // Comprobar que el BIN tiene al menos 6 dígitos
    if (bin.length < 6) {
      alert('El BIN debe tener al menos 6 dígitos.');
      return;
    }
  
    // Crear el número de tarjeta con el BIN proporcionado
    let cardNumber = bin.split('');
    
    // Generar los 10 dígitos restantes aleatorios para completar la tarjeta
    for (let i = cardNumber.length; i < length - 1; i++) {
      cardNumber.push(Math.floor(Math.random() * 10));
    }
  
    // Calcular el último dígito usando el algoritmo de Luhn
    let sum = 0;
    let shouldDouble = false;
  
    // Recorrer los 15 dígitos generados en el array
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let currentDigit = cardNumber[i];
  
      if (shouldDouble) {
        currentDigit *= 2;
  
        if (currentDigit > 9) {
          currentDigit -= 9;
        }
      }
  
      sum += currentDigit;
      shouldDouble = !shouldDouble;
    }
  
    // El dígito final que completa la tarjeta
    let lastDigit = (10 - (sum % 10)) % 10;
  
    // Añadir el último dígito al array
    cardNumber.push(lastDigit);
  
    // Generar la fecha de caducidad y CVV de forma aleatoria o por el usuario
    return {
      cardNumber: cardNumber.join(''),
      expiryDate: expiryDate || generateRandomExpiry(),
      cvv: cvv || generateRandomCVV()
    };
}

// Función para generar una fecha de caducidad aleatoria (MM/AA)
function generateRandomExpiry() {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'); // Mes aleatorio entre 01 y 12
    const year = String(Math.floor(Math.random() * 10) + 22); // Año aleatorio entre 22 y 31
    return `${month}/${year}`;
}

// Función para generar un CVV aleatorio de 3 dígitos
function generateRandomCVV() {
    return String(Math.floor(Math.random() * 900) + 100); // Genera un CVV aleatorio de 3 dígitos entre 100 y 999
}

// Función para actualizar la lista de tarjetas generadas
function displayCardNumbers() {
    const bin = document.getElementById('bin').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const numCards = parseInt(document.getElementById('numCards').value);

    // Limpiar la lista de tarjetas generadas
    const cardList = document.getElementById('cardList');
    cardList.innerHTML = '';

    for (let i = 0; i < numCards; i++) {
        const card = generateCardNumber(bin, expiryDate, cvv);
        const cardItem = document.createElement('li');
        cardItem.innerHTML = `Número: ${card.cardNumber} | Fecha de caducidad: ${card.expiryDate} | CVV: ${card.cvv}`;
        cardList.appendChild(cardItem);
    }
}

// Función para copiar todas las tarjetas al portapapeles y limpiar la pantalla
function copyAndClear() {
    const cardList = document.getElementById('cardList');
    let textToCopy = '';

    // Crear el texto que será copiado (todas las tarjetas)
    for (const card of cardList.children) {
        textToCopy += card.textContent + '\n';
    }

    // Copiar al portapapeles
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Las tarjetas han sido copiadas al portapapeles.');
    }).catch((err) => {
        console.error('Error al copiar:', err);
    });

    // Limpiar la lista de tarjetas generadas
    cardList.innerHTML = '';
}

// Añadir eventos a los botones
document.getElementById('generateButton').addEventListener('click', displayCardNumbers);
document.getElementById('copyAndClearButton').addEventListener('click', copyAndClear);


window.onload = function() {
    document.body.style.zoom = "125%";
  };


  