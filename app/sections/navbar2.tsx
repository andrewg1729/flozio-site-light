import Illustration from "../svgs/svg-illustration";
import Icon2 from "../svgs/svg-icon2";
/** Navbar2 section. */
export default function Navbar2() {
  return (
    <nav className="nav flow-2" data-component="nav">
      <div className="box-10 flow-2" />
      <div className="box-11 row-8">
        <div className="row-9">
          <a className="link-3 stack" data-component="link" aria-label="ClickUp Home" href="/">
            <Illustration />
          </a>
          <div className="row-10">
            <button className="btn row-11 type-12" data-component="button" aria-expanded="false" aria-haspopup="true" type="button">
              <span className="text-3 flow-2 type-13">
                Brain AI
              </span>
              <div className="row-2 type-14">
                <Icon2 />
              </div>
            </button>
            <button className="btn row-11 type-12" data-component="button" aria-expanded="false" aria-haspopup="true" type="button">
              <span className="text-4 flow-2 type-15">
                Product
              </span>
              <div className="row-2 type-14">
                <Icon2 />
              </div>
            </button>
            <button className="btn row-11 type-12" data-component="button" aria-expanded="false" aria-haspopup="true" type="button">
              <span className="text-4 flow-2 type-15">
                Solutions
              </span>
              <div className="row-2 type-14">
                <Icon2 />
              </div>
            </button>
            <button className="btn row-11 type-12" data-component="button" aria-expanded="false" aria-haspopup="true" type="button">
              <span className="text-4 flow-2 type-15">
                Learn
              </span>
              <div className="row-2 type-14">
                <Icon2 />
              </div>
            </button>
            <a className="link-4 row-11 type-15" data-component="link" href="/pricing">
              Pricing
            </a>
            <a className="link-4 row-11 type-15" data-component="link" href="/plans/enterprise">
              Enterprise
            </a>
          </div>
        </div>
        <div className="row-12">
          <button className="btn-2 row-13 type-16" data-component="button" type="button">
            <span className="row-14">
              Get a Demo
            </span>
          </button>
          <a className="btn-3 row-15 type-17" data-component="button" href="https://app.clickup.com/login">
            Login
          </a>
          <button className="btn-4 row-16 type-18" data-component="button" type="button">
            <span className="row-14">
              Sign Up
            </span>
          </button>
          <button className="btn-5 flow-6 type-12" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open mobile menu" type="button">
            <div className="box-12 flow-2" />
            <div className="box-13 flow-2" />
            <div className="box-14 flow-2" />
          </button>
        </div>
      </div>
    </nav>
  );
}
