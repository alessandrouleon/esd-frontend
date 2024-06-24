import styled from "styled-components";
import BackupIcon from "@mui/icons-material/Backup";
import { COLORS } from "../../themes/colors";

export const FormModal = styled.form`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  .section-one {
    display: flex;
    justify-content: space-between;
  }

  .textfield {
    margin-right: 25px;
  }

  .section-three {
    display: flex;
  }

  .section-three-switch {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  .section-four {
    border-radius: 1rem;
    padding-top: 0rem;
    width: 7.9rem;
    height: 8rem;
    /* background: ${COLORS.NEUTRAL_200}; */
  }

  .container-element {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 0rem;
    padding-left: 0.722rem;
    padding-top: 0.5rem;
  }
  .model-img {
    display: grid;
    place-items: center;
    width: 6.5rem;
    height: 6.5rem;
    background: ${COLORS.NEUTRAL_100};
    border-radius: 100%;
    border: solid 1px ${COLORS.NEUTRAL_300};
    padding: 0.2rem;
  }

  /*Configurando calendário  */
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.8) brightness(50%) sepia(60%) saturate(50%)
      hue-rotate(30deg);
    cursor: pointer;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.2rem;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: flex-end;

  button:nth-child(1) {
    margin-right: 25px;
  }
`;

export const UploadIcon = styled(BackupIcon)`
  height: 14px;
  width: 20px;
  border-radius: 0px;
  margin-left: 5px;
  align-items: center;
`;

