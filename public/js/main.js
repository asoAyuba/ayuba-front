document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const feedback = form.querySelector('.form-feedback');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // Ocultar mensajes previos
      feedback.style.display = 'none';
      feedback.textContent = '';
  
      // Primero, removemos el estado de error previo
      const groups = form.querySelectorAll('.form-group');
      groups.forEach(group => {
        group.classList.remove('has-error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.style.display = 'none';
      });
  
      // Validar el formulario manualmente
      let isValid = true;
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        if (!input.checkValidity()) {
          isValid = false;
          const group = input.closest('.form-group');
          const errorMsg = group.querySelector('.error-message');
          group.classList.add('has-error');
          if (errorMsg) errorMsg.style.display = 'block';
        }
      });
  
      if(!isValid) {
        // Si no es válido, no hacemos el fetch
        return; 
      }
  
      // Recopilar datos del formulario
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };
  
      try {
        // Enviar datos a una API externa (modifica la URL según tus necesidades)
        const response = await fetch('https://api.ejemplo.com/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        
        const result = await response.json();
        
        // Mostrar mensaje de éxito
        feedback.style.display = 'flex';
        feedback.style.color = 'green';
        feedback.textContent = '¡Tu mensaje ha sido enviado con éxito!';
        
        // Limpiar el formulario
        form.reset();
      } catch (error) {
        // Mostrar mensaje de error
        feedback.style.display = 'flex';
        feedback.style.color = 'red';
        feedback.textContent = 'Ocurrió un error al enviar tu mensaje. Inténtalo nuevamente.';
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const catCards = document.querySelectorAll('.cat-card');
    const catModal = document.getElementById('cat-modal');
  
    // Elementos del modal del gato
    const modalCatImg = document.getElementById('modal-cat-img');
    const modalCatName = document.getElementById('modal-cat-name');
    const modalCatAge = document.getElementById('modal-cat-age');
    const modalCatSex = document.getElementById('modal-cat-sex');
    const modalCatDesc = document.getElementById('modal-cat-desc');
    const preAdoptBtn = document.getElementById('preAdopt-btn'); // Botón de pre-adoptar
    const catClose = document.querySelector('.cat-close');
  
    // Elementos del modal de preadopción
    const preAdoptionModal = document.getElementById('preadoption-modal');
    const gatitoInput = document.getElementById('gatito');
    const preAdoptionClose = document.querySelector('.preadoption-close');
  
    // Abrir modal del gato
    catCards.forEach(card => {
      card.addEventListener('click', () => {
        const index = card.getAttribute('data-cat-index');
        const gato = window.gatos[index];
  
        // Rellenar datos del modal del gato
        modalCatImg.src = gato.imagen;
        modalCatName.textContent = gato.nombre;
        modalCatAge.textContent = `Edad: ${gato.edad}`;
        modalCatSex.textContent = `Sexo: ${gato.sexo}`;
        modalCatDesc.textContent = gato.descripcion;
  
        // Mostrar el modal del gato
        catModal.style.display = 'flex';
  
        // Configurar el botón "Pre-adoptar" para abrir el modal de preadopción
        preAdoptBtn.setAttribute('data-gatito-name', gato.nombre);
      });
    });
  
    // Abrir modal de preadopción desde el modal del gato
    preAdoptBtn.addEventListener('click', () => {
      const gatitoName = preAdoptBtn.getAttribute('data-gatito-name');
  
      // Rellenar el campo del formulario
      gatitoInput.value = gatitoName;
  
      // Cerrar el modal del gato y abrir el de preadopción
      catModal.style.display = 'none';
      preAdoptionModal.style.display = 'flex';
    });
  
    // Cerrar modales
    catClose.addEventListener('click', () => {
      catModal.style.display = 'none';
    });
  
    preAdoptionClose.addEventListener('click', () => {
      preAdoptionModal.style.display = 'none';
    });
  
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
      if (e.target === catModal) {
        catModal.style.display = 'none';
      } else if (e.target === preAdoptionModal) {
        preAdoptionModal.style.display = 'none';
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const tabsNav = document.querySelectorAll('.tabs-nav li');
    const tabsPanels = document.querySelectorAll('.tab-panel');
  
    tabsNav.forEach(tab => {
      tab.addEventListener('click', () => {
        // Eliminar la clase 'active' de todas las pestañas y paneles
        tabsNav.forEach(nav => nav.classList.remove('active'));
        tabsPanels.forEach(panel => panel.classList.remove('active'));
  
        // Agregar la clase 'active' a la pestaña y panel seleccionados
        tab.classList.add('active');
        const targetPanel = document.getElementById(tab.getAttribute('data-tab'));
        targetPanel.classList.add('active');
      });
    });
  });