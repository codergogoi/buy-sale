/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrderModel } from "../../types/models/order-model";
import { Container } from "@mui/material";
import { AppCSS, Lbl, Spacer, TapButton, TxtInput } from "../../components";
import { ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import moment from "moment";

interface OrderTableProps {
  orders: OrderModel[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [keyword, setKeyword] = React.useState("");

  const filterLeads = () => {
    if (keyword.length > 0 && Array.isArray(orders)) {
      return orders.filter((item) => {
        return `${item.name}`;
      });
    }
    return orders;
  };

  const OrderTableView = () => {
    return (
      <Container>
        <Spacer size={2} direction="col" />
        <RowDiv
          style={{
            justifyContent: "flex-start",
          }}
        >
          <TxtInput
            width={280}
            placeholder={`Search product item`}
            onChange={setKeyword}
          />
        </RowDiv>
        <Spacer size={2} direction="col" />
        <RowDiv
          style={{
            width: "100%",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <table style={{ width: "100%" }}>
            <tr
              style={{
                width: "100%",
                height: "40px",
                background: AppCSS.RED_MILD,
              }}
            >
              <th>Order Date Time</th>
              <th>Ordered Item</th>
              <th>Item Price</th>
              <th>Order Details</th>
              {/* <th>Action</th> */}
            </tr>
            {filterLeads()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const key = `key-${row.id}`;
                return (
                  <tr key={key} style={{ width: "100%", height: "40px" }}>
                    <td>
                      <p>
                        {moment(row.CreatedAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                    </td>
                    <td>
                      <p
                        style={{
                          color: AppCSS.BLACK,
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                          fontSize: "0.9rem",
                          margin: 0,
                          padding: 10,
                        }}
                      >{`${row.name}`}</p>
                    </td>

                    <td>{row.price}</td>
                    <td>
                      <TapButton
                        title="View"
                        onTap={() => navigate(`/seller-order/${row.id}`)}
                        bgColor={AppCSS.WHITE}
                        borderColor={AppCSS.RED}
                        color={AppCSS.RED}
                        radius={10}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </RowDiv>
      </Container>
    );
  };

  return (
    <Container>
      <ColDiv
        style={{
          display: "row",
          maxWidth: "1100px",
          justifyContent: "space-around",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <RowDiv
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: "none",
          }}
        >
          {Array.isArray(orders) && OrderTableView()}
        </RowDiv>
      </ColDiv>
    </Container>
  );
};
