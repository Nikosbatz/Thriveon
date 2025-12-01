import { useState } from "react";
import { ClipboardPlus } from "lucide-react";

import FoodSelectionPanel from "./FoodSelectionPanel/FoodSelectionPanel";

export default function FoodListDialog() {
  const [openAddCaloriesDialog, setOpenAddCaloriesDialog] = useState(false);
  return (
    <>
      <button onClick={() => setOpenAddCaloriesDialog((prev) => !prev)}>
        <ClipboardPlus></ClipboardPlus>Today calories
      </button>
      <div
        className={
          openAddCaloriesDialog ? "dialog-overlay active" : "dialog-overlay"
        }
      >
        <FoodSelectionPanel
          setOpenAddCaloriesDialog={setOpenAddCaloriesDialog}
          openAddCaloriesDialog={openAddCaloriesDialog}
        ></FoodSelectionPanel>
      </div>
    </>
  );
}
