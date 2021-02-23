const keys = require('../keys')

module.exports = function (email, name, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Восстановление доступа',
        html: `
        <div style="background:#eee;padding:30px;">
            <div style="background:#fff;padding: 15px 20px;max-width: 550px;border: 1px solid #e3e3e5;border-radius:3px;margin: 0 auto;font: normal 13px/19px Verdana;box-shadow: 0 3px 7px rgba(0,0,0,.1);">
                <h2 style="font:normal 21px/48px Arial;color: #222;margin: 0;">
                    Восстановление пароля
                </h2>

                <div style="padding: 15px 0;"> 
                    Уважаемый <b>${name}</b>. Вы сделали запрос на получение забытого пароля на сайте <a href="${keys.BASE_URL}">bookShop</a> Чтобы получить новый пароль, пройдите по ссылке ниже:
                </div>
                <a href="${keys.BASE_URL}/auth/reset/${token}" style="width: 60%;margin:0 auto;display: block;background: #0066ff; border-radius: 12px; padding: 9px 15px; color: #fff;font-weight:bold; text-align: center;text-transform: uppercase;text-decoration: none;text-shadow: 0 1px 3px rgba(0,0,0,.35);box-shadow: inset 0 1px rgba(255,255,255,.4);">
                    Восстановить пароль
                </a>
                <div style="padding: 15px 0;"> 
                    Если вы не делали запроса для получения пароля, то просто удалите данное письмо. Ваш пароль храниться в надежном месте и недоступен посторонним лицам.
                </div>
            </div>
        </div>
        `,
    }
}
