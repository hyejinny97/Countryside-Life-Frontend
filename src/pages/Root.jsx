import axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@components/root";
import { Toast } from "@components/ui";
import { silentRefresh } from "@helpers";
import { store, runToast, disappearMessageModal } from "@store";

async function loader() {
  if (axios.defaults.headers.common.Authorization) return null;

  try {
    await silentRefresh();
    return null;
  } catch (e) {
    return null;
  }
}

async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("user_name");
  const email = formData.get("user_email");
  const content = formData.get("message_content");

  // validation
  const validation = {};
  if (!name.trim()) validation.nameInvalidText = ["닉네임을 입력해주세요."];
  if (!content.trim()) validation.messageInvalidText = ["내용을 입력해주세요."];

  if (Object.keys(validation).length) return validation;

  // 메일 보내기
  window.emailjs
    .send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, {
      user_name: name,
      user_email: email,
      message_content: content,
    })
    .then(
      function (response) {
        store.dispatch(runToast("성공적으로 요청을 보냈습니다."));
        store.dispatch(disappearMessageModal());
      },
      function (error) {
        store.dispatch(runToast("요청 보내는 것을 실패했습니다."));
      }
    );

  return null;
}

function Root() {
  const { cnt, toastContent } = useSelector(
    ({ toast: { cnt, toastContent } }) => {
      return {
        cnt,
        toastContent,
      };
    },
    shallowEqual
  );

  return (
    <main className="Root">
      <Navbar />
      <Outlet />
      <Footer />
      {cnt > 0 ? <Toast>{toastContent}</Toast> : ""}
    </main>
  );
}

export default Root;
export { loader, action };
