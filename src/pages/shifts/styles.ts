import styled from "styled-components";

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
    width: 100%;
    margin-top: 15px;

    label {
      color: #a3a3a3;
      font-size: 12px;
    }
  }

  /*Configurando calendário  */
  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(0.8) brightness(50%) sepia(60%) saturate(50%)
      hue-rotate(30deg);
    cursor: pointer;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.2rem;
  }
`;