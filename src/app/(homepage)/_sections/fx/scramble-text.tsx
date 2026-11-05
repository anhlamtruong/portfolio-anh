// Markup hook for the scramble effect (scramble.ts). Server-safe: no hooks.
// Wrap only the label text of a link/button, never its icons:
//   <a className="bp-btn"><Icon /> <ScrambleText>{label}</ScrambleText></a>
// Use `inline` when the parent is a plain inline link (not flex), so the
// link's underline still reaches the text.

export function ScrambleText({ children, inline = false }: { children: string; inline?: boolean }) {
  return (
    <span className={inline ? "fx-scr fx-scr--inline" : "fx-scr"} data-fx-scr="">
      <span className="fx-scr__txt">{children}</span>
      <span className="fx-scr__fx" aria-hidden="true">
        <span className="fx-scr__done" />
        <span className="fx-scr__tail" />
      </span>
    </span>
  );
}
