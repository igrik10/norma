<ul class="men_tpl">
	<li><a href="http://norma.my-webstudio.ru/">Головна</a></li>
	<li><a href="http://norma.my-webstudio.ru/category.html">Категорії</a></li>
	<li><a href="http://norma.my-webstudio.ru/cart.html">Корзина</a></li>
	<li><a href="http://norma.my-webstudio.ru/recipes.html">Рецепти</a></li>	
	<li><a href="http://norma.my-webstudio.ru/recipe.html">Сторінка рецепта</a></li>		
	<li><a href="http://norma.my-webstudio.ru/text_page.html">Текстова сторінка</a></li>
	<li><a href="http://norma.my-webstudio.ru/text_page_about.html">Текстова сторінка 2</a></li>
</ul>


	<div id="mreg" class="modal modal-reg">
		<div class="form-reg">
			<span class="close-modal">Закрити</span>
			<div class="form">
				<div class="modal-title">Реєстрація</div>
				<form onsubmit="return userReg();">
					<div class="field icon email">
						<input class="styler" required type="email" name="email" placeholder="Email" />
					</div>
					<div class="field icon name">
						<input class="styler" required type="text" name="name" placeholder="Ім'я" />
					</div>
					<div class="field icon pass">
						<input class="styler" required type="password" name="password" placeholder="Пароль" />
					</div>
					<div class="field icon tel">
						<input class="styler" required type="tel" name="phone" placeholder="Телефон" />
					</div>
					<div class="accept">
						<label><input type="checkbox" required />Я приймаю</label>
						<br><a href="/agreement">Правила реєстрації користувачів.</a>
					</div>
					<div class="field error"></div>
					<div class="button">
						<button class="btn green" type="submit">Зареєструватись</button>
					</div>
				</form>
			</div>
			<div class="social-auth">
				<span>Використовуючи соц. мережі</span>
				<div class="social-auth-btn">
					<a title="ВКонтакте" href="/oauth/vk" target="_top" class="vk">ВКонтакте</a>
					<a title="Facebook" href="/oauth/facebook" target="_top" class="fb">Facebook</a>
					<a title="Mail.Ru" href="/oauth/mailru" target="_top" class="mr">Mail.Ru</a>
				</div>
			</div>
		</div>
	</div>

	<div id="msignin" class="modal modal-signin">
		<div class="form-signin">
			<span class="close-modal">Закрити</span>
			<div class="form">
				<div class="modal-title">Вхід</div>
				<form onsubmit="return userLogin();">
					<div class="field icon email">
						<input class="styler" required type="email" name="email" placeholder="Email" />
					</div>
					<div class="field icon pass">
						<input class="styler" required type="password" name="password" placeholder="Пароль" />
					</div>
					<div class="field error"></div>
					<div class="buttons">
						<a class="recover-link modalLink" href="#mrecover">Забули пароль?</a>
						<div class="button">
							<button class="btn green" type="submit">Увійти</button>
						</div>
						<div class="registration">
							Ви ще не з нами?
							<a class="modalLink" href="#mreg">Зареєструйтесь!</a>
						</div>
					</div>
				</form>
			</div>
			<div class="social-auth">
				<span>Використовуючи профіль соц. мереж</span>
				<div class="social-auth-btn">
					<a title="ВКонтакте" href="/oauth/vk" target="_top" class="vk">ВКонтакте</a>
					<a title="Facebook" href="/oauth/facebook" target="_top" class="fb">Facebook</a>
					<a title="Mail.Ru" href="/oauth/mailru" target="_top" class="mr">Mail.Ru</a>
				</div>
			</div>
		</div>
	</div>

	<div id="mrecover" class="modal modal-recover">
		<div class="form-recover">
			<span class="close-modal">Закрити</span>
			<div class="form">
				<div class="modal-title">Відновлення паролю</div>
				<form onsubmit="return forgotPassword();">
					<div class="field icon email">
						<input class="styler" required type="email" name="email" placeholder="Введіть E-mail" />
					</div>
					<div class="info">
						<p>Ми вірдправимо вам на пошту інструкції по відновленню пароля</p>
					</div>
					<div class="button">
						<button class="btn green" type="submit">Відправити</button>
					</div>
				</form>
			</div>
		</div>
		<a href="#mrecover" class="modalLink"></a>
	</div>

	<div id="mpassword" class="modal modal-recover">
		<div class="form-recover">
			<span class="close-modal">Закрини</span>
			<div class="form">
				<div class="modal-title">Відновлення пароля</div>
				<form onsubmit="return changePassword();">
					<div class="field icon pass">
						<input class="styler" required name="password" type="password" placeholder="Новий пароль" />
					</div>
					<div class="info">
						<p>Введіть новий пароль</p>
					</div>
					<div class="buttons">
						<button class="btn green" type="submit">Відправити</button>
					</div>
				</form>
			</div>
		</div>
		<a href="#mpassword" class="modalLink"></a>
	</div>

	<div id="mfeedback" class="modal modal-feedback">
		<div class="form-feedback">
			<span class="close-modal">Закрити</span>
			<div class="form">
				<div class="modal-title">Написати адміністрації</div>
				<form onsubmit="return sendFeedback();">
					<div class="field icon email">
						<input class="styler" required type="email" name="mail" placeholder="Email" />
					</div>
					<div class="field icon name">
						<input class="styler" required type="text" name="name" placeholder="Ім'я" />
					</div>
					<div class="field icon tarea">
						<textarea class="styler" required name="text" placeholder="Повідомлення..."></textarea>
					</div>
					<div class="button">
						<button class="btn green" type="submit">Відправити</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="mloader" class="modal modal-loader">
		<img src="/img/loader.gif" alt="Загрузка">
		<a href="#mloader" class="modalLink"></a>
	</div>

	<div id="mconfirm" class="modal modal-confirm">
		<div class="form-confirm">
			<div class="form">
				<div class="modal-title">Сообщение</div>
				<div class="info">Сообщение успешно отправлено!</div>
				<div class="button">
					<button class="btn grey" type="submit">Ок, понятно!</button>
				</div>
			</div>
		</div>
		<a href="#mconfirm" class="modalLink"></a>
	</div>