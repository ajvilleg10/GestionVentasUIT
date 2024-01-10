import emailjs from '@emailjs/browser';

// emailjs.init('52rM7NC8r297dUgP7');

const sendEmail = (values) => {
  const templateParams = {
    nombres: values.nombres,
    apellidos: values.apellidos,
    email: values.email,
    password: values.password,
    to_email: values.email,
    reply_to: 'gestionventas28@gmail.com'
  };

  emailjs
    .send('service_frbsyfb', 'template_pph031b', templateParams, '52rM7NC8r297dUgP7')
    .then((response) => {
      console.log('Email sent successfully!', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};

export default sendEmail;
