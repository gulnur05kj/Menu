import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

export const TourItem = ({
  id,
  title,
  price,
  imageUrl,
  description,
  date,
  handleDeleteTour,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");

  const handleCheckboxChange = async (e) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);

    try {
      const response = await fetch(
        `https://be8ea0975549e774.mokky.dev/menu/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: newValue }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(`Успех: ${result.message}`);
        setResponseType("success");
      } else {
        setResponseMessage(`Ошибка: ${response.statusText}`);
        setResponseType("error");
      }
    } catch (error) {
      setResponseMessage(`Ошибка: ${error.message}`);
      setResponseType("error");
    }
  };

  return (
    <StyledLi>
      <StyledImage src={imageUrl} alt={title} />
      <h3 style={{ color: "black" }}>{title}</h3>
      <div>
        <b style={{ color: "black" }}>${price}</b>
        <span style={{ marginLeft: "10px", color: "black" }}>{date}</span>
        <StyledDiv>
          <StyledDescription>{description}</StyledDescription>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Активен"
            />
            {responseMessage && (
              <ResponseMessage type={responseType}>
                {responseMessage}
              </ResponseMessage>
            )}
            <StyledButton onClick={() => handleDeleteTour(id)}>
              Удалить
            </StyledButton>
          </div>
        </StyledDiv>
      </div>
    </StyledLi>
  );
};

export const StyledLi = styled.li`
  width: 350px;
  height: 480px;
  border: 2px solid black;
  border-radius: 20px;
  padding: 20px 10px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const StyledButton = styled.button`
  width: 200px;
  height: 35px;
  background-color: #1919c1;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1414a8;
  }
`;

export const StyledDescription = styled.p`
  margin-top: 20px;
  color: black;
`;

export const StyledImage = styled.img`
  width: 300px;
  height: 200px;
`;

const ResponseMessage = styled.p`
  color: ${(props) => (props.type === "success" ? "green" : "red")};
  font-weight: bold;
`;
