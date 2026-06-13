export function openFullscreenWindow(url: string) {
  const { availWidth, availHeight } = window.screen;
  window.open(
    url,
    "_blank",
    `noopener,noreferrer,width=${availWidth},height=${availHeight},left=0,top=0`,
  );
}
