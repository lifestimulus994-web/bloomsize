const ITEMS = ["მზა დიეტები", "სამოტივაციო ვიდეოები", "პერსონალური გეგმა", "ჩატი ნუტრიციოლოგთან", "საყიდლების სია", "რეცეპტები", "პროგრესის კონტროლი"];

export default function Marquee() {
  const row = ITEMS.map((t) => (<span key={t}>{t}<i /></span>));
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">{row}{row}{row}{row}</div>
    </div>
  );
}
