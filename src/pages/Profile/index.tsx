import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { AppCSS, Lbl, Spacer, TxtInput } from "../../components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Profile = () => {
  const ProfileDetails = () => {
    return (
      <Accordion style={{ width: "100%" }} elevation={0} defaultExpanded={true}>
        <AccordionSummary
          style={{
            background: AppCSS.ORANGE,
            color: AppCSS.WHITE,
            margin: 2,
            borderRadius: 10,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Lbl title="Profile Details" color={AppCSS.WHITE} bold={600} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RowDiv
            style={{
              display: "row",
              justifyContent: "space-around",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ColDiv
              style={{
                marginRight: "100px",
              }}
            >
              <Spacer size={1} direction="col" />
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <ColDiv>
                  <Lbl title="First Name" color={AppCSS.GRAY_DARK} size={13} />
                  <TxtInput
                    disable={true}
                    value={``}
                    placeholder="First Name"
                    onChange={() => {}}
                  />
                </ColDiv>
              </RowDiv>
              <ColDiv>
                <Lbl title="Last Name" color={AppCSS.GRAY_DARK} size={13} />
                <TxtInput
                  disable={true}
                  value={``}
                  placeholder="Last Name"
                  onChange={() => {}}
                />
              </ColDiv>
            </ColDiv>
            <ColDiv
              style={{
                marginRight: "50px",
                alignItems: "center",
              }}
            >
              <ColDiv>
                <RowDiv
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <Lbl title="Email" color={AppCSS.GRAY_DARK} size={13} />
                </RowDiv>

                <TxtInput
                  value={``}
                  disable={true}
                  placeholder="Email"
                  onChange={() => {}}
                />
              </ColDiv>
              <ColDiv>
                <Lbl title="Phone" color={AppCSS.GRAY_DARK} size={13} />

                <TxtInput
                  value={``}
                  placeholder="Phone"
                  onChange={() => {}}
                  disable
                />
              </ColDiv>
            </ColDiv>
          </RowDiv>
        </AccordionDetails>
      </Accordion>
    );
  };

  const AddressDetails = () => {
    return (
      <Accordion style={{ width: "100%" }} elevation={0}>
        <AccordionSummary
          style={{
            background: AppCSS.ORANGE,
            color: AppCSS.WHITE,
            margin: 2,
            borderRadius: 10,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Lbl title="Address Details" color={AppCSS.WHITE} bold={600} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RowDiv
            style={{
              display: "row",
              justifyContent: "space-around",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ColDiv
              style={{
                marginRight: "100px",
              }}
            >
              <Spacer size={1} direction="col" />
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <ColDiv>
                  <Lbl title="First Name" color={AppCSS.GRAY_DARK} size={13} />
                  <TxtInput
                    disable={true}
                    value={``}
                    placeholder="First Name"
                    onChange={() => {}}
                  />
                </ColDiv>
                <ColDiv>
                  <Lbl title="Last Name" color={AppCSS.GRAY_DARK} size={13} />
                  <TxtInput
                    disable={true}
                    value={``}
                    placeholder="Last Name"
                    onChange={() => {}}
                  />
                </ColDiv>
              </RowDiv>
              <ColDiv>
                <Lbl
                  title="Customer Phone"
                  color={AppCSS.GRAY_DARK}
                  size={13}
                />
                <TxtInput
                  disable={true}
                  value={``}
                  placeholder="Customer Phone"
                  onChange={() => {}}
                />
              </ColDiv>
              <ColDiv>
                <Lbl title="Email" color={AppCSS.GRAY_DARK} size={13} />

                <TxtInput
                  value={``}
                  placeholder="Email"
                  onChange={() => {}}
                  disable
                />
              </ColDiv>
              <Spacer size={1} direction="col" />
            </ColDiv>
            <ColDiv
              style={{
                marginRight: "50px",
                alignItems: "center",
              }}
            >
              <ColDiv>
                <RowDiv
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <Lbl title="Address" color={AppCSS.GRAY_DARK} size={13} />
                </RowDiv>

                <TxtInput
                  value={``}
                  disable={true}
                  placeholder="Street Address"
                  onChange={() => {}}
                />
              </ColDiv>
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <ColDiv>
                  <Lbl title="City Name" color={AppCSS.GRAY_DARK} size={13} />

                  <TxtInput
                    value={""}
                    placeholder="City Name"
                    onChange={() => {}}
                  />
                </ColDiv>
                <Spacer size={1} direction="row" />
                <ColDiv>
                  <Lbl title="State Name" color={AppCSS.GRAY_DARK} size={13} />

                  <TxtInput
                    value={""}
                    placeholder="State Name"
                    onChange={() => {}}
                  />
                </ColDiv>
              </RowDiv>

              <Spacer size={2} direction="col" />
              <RowDiv style={{ justifyContent: "flex-end" }}></RowDiv>
            </ColDiv>
          </RowDiv>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <CenterBox
      style={{
        width: "900px",
        background: "#fff",
        boxShadow: "1px 1px 5px 1px #DBDBDB",
        borderRadius: 5,
        padding: 20,
        minHeight: 600,
        overflow: "scroll",
      }}
    >
      {ProfileDetails()}
      {AddressDetails()}
    </CenterBox>
  );
};
