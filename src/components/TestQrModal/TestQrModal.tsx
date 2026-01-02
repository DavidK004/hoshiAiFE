import QRCode from "react-qr-code";
import { Modal, Box, Button } from "@mui/material";

import type { TestType } from "../shared/types/TestTypes";

interface QrProps {
    open: boolean,
    onClose: () => void,
    test: TestType
}

const TestQrModal = ({ open, onClose, test }: QrProps) => {
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          
        }}
      >
        <QRCode value={String(test.id)} size={200} />
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};
 
export default TestQrModal;