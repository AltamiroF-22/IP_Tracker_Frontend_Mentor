/* eslint-disable react/prop-types */
import "./Msg.sass";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const FilledAlerts = ({ mensagemType, mensagem, isVisible }) => {
  return (
    <div className="">
      {isVisible ? (
        <Stack className="message" sx={{ width: "300px" }} spacing={2}>
          <Alert variant="filled" severity={mensagemType}>
            {mensagem}
          </Alert>
        </Stack>
      ) : null}
    </div>
  );
};

export default FilledAlerts;
