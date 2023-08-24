const flexStyle = {
  top: 0,
  left: 0,
  display: "flex",
  flexWrap: "wrap",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center"
};

const grassStyle = {
  opacity: 0.9,
  fontSize: "2rem",
  transition: "0.25s",
  backdropFilter: "blur(10px)",
  boxShadow: "rgba(0, 0, 0, 0.3) 2px 8px 8px"
};

export const mainStyle = {
  ...flexStyle,
  ...grassStyle,
  gap: "1rem",
  width: "100%",
  height: "100%",
  position: "fixed"
};

export const itemStyle = {
  ...flexStyle,
  ...grassStyle,
  gap: "1rem",
  width: "calc(50vw)",
  padding: "1rem",
  borderRadius: "5px"
};
