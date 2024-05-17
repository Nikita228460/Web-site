document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Сохраняем данные в localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Создаем XML документ
    let xml = new XMLSerializer().serializeToString(document.implementation.createDocument("", "", null));

    // Преобразуем XML в строку
    let xmlString = encodeURIComponent(xml);

    // Сохраняем XML в localStorage (это просто для демонстрации, так как localStorage не поддерживает XML напрямую)
    localStorage.setItem('userDataXml', xmlString);

    console.log("Данные пользователя сохранены");
});
