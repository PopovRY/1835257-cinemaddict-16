export const createFooterFilmsCount = (films) => (
  `<section class="footer__statistics">
  <p>${new Intl.NumberFormat('ru').format(films.length)} movies inside</p>
</section>`
);
