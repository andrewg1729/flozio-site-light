import Icon from "../svgs/svg-icon";
/** Top navigation bar. */
export default function Navbar() {
  return (
    <aside className="flow-2">
      <a className="link row" data-component="link" href="/brain">
        <div className="box-6 row-2">
          <div className="box-7 row-3">
            <span className="flow-2 type-4">
              {"NEW: Brain² — "}
            </span>
            <div className="box-8 row-4 type-5">
              <p className="text flow-2 type-6">
                {"The best AI is "}
                <em className="flow-4 type-7">
                  your
                </em>
                {" AI. The world's first company Brain"}
              </p>
            </div>
          </div>
          <div className="box-9 row-5">
            <div className="link-2 row-6 type-8" data-component="link" href="/brain">
              <strong className="row-7 type-9">
                <span className="text-2 flow-2 type-10">
                  {" "}
                  <Icon />
                </span>
              </strong>
            </div>
          </div>
        </div>
      </a>
    </aside>
  );
}
