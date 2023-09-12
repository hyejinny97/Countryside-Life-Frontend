import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "@assets/logo_gray.png";
import { Menu } from "@components/ui";
import { MessageModal } from "@components/root";
import { footerMenuData } from "@datas/root";
import { disappearMessageModal, appearMessageModal } from "@store";

function Footer() {
  const dispatch = useDispatch();
  const showMessageModal = useSelector((state) => state.messageModal.show);

  const handleModalClose = () => dispatch(disappearMessageModal());

  const config = {
    render(item) {
      if (item.label === "서비스 개선 요청")
        return (
          <span
            className="Footer__menu-item--message"
            onClick={() => dispatch(appearMessageModal())}
          >
            {item.label}
          </span>
        );

      return <Link to={item.to}>{item.label}</Link>;
    },
    horizontal: true,
  };

  return (
    <footer className="Footer container">
      <div className="Footer__wrap container__wrap">
        <section className="Footer__head">
          <img className="Footer__logo" src={logo} alt="logo" />
        </section>
        <section className="Footer__body">
          <Menu data={footerMenuData} config={config} />
        </section>
        <section className="Footer__foot">
          <p>@copyright HyeJinYun</p>
        </section>
      </div>
      {showMessageModal && <MessageModal handleModalClose={handleModalClose} />}
    </footer>
  );
}

export default Footer;
