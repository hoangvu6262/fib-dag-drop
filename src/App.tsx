import { useEffect, useState } from "react";
import "./App.scss";
import Paragraph from "./components/Paragraph";
import { NotificationType, QuestionData } from "./constants/type";
import Notifications from "./components/Notification";
import { useNotificationStore } from "./stores/useNotificationStore";

function App() {
  const [data, setData] = useState<QuestionData | null>(null);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/data/question.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const jsonData = await response.json();
        addNotification("Get data success.", NotificationType.SUCCESS);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    getData();
  }, [addNotification]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Paragraph question={data.question} />
      <Notifications />
    </div>
  );
}

export default App;
