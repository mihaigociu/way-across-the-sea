// Dev helper: opens the chapters menu and clicks a button in it, opening the right book first.
// `sel` is a Playwright selector inside .menu, e.g. '.play:has-text("Second")' or 'button[title="Quiz: …"]'.
export async function menuClick(p, sel) {
  await p.hover('.menu-btn');
  const target = p.locator(`.menu ${sel}`).first();
  const books = p.locator('.menu .book:not([disabled])');
  for (let i = 0; !(await target.count()) && i < (await books.count()); i++) await books.nth(i).click();
  await target.click();
}
