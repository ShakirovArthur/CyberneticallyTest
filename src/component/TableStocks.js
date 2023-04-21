import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { fetchStocksList, switchPage, updateStocksList } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//Фейковое кол-во новостей , т.к. API предоставляет записи за полседний месяц
const FAKE_NEWS_COUNT = 100;

const columns = [
  { id: 1, label: "close" },
  { id: 2, label: "high" },
  { id: 3, label: "low" },
  { id: 4, label: "open" },
  { id: 5, label: "priceDate" },
  { id: 6, label: "symbol" },
  { id: 7, label: "volume" },
  { id: 8, label: "id" },
  { id: 9, label: "key" },
  { id: 10, label: "date" },
  { id: 11, label: "updated" },
  { id: 12, label: "changeOverTime" },
  { id: 13, label: "marketChangeOverTime" },
  { id: 14, label: "uOpen" },
  { id: 15, label: "uClose" },
  { id: 16, label: "uHigh" },
  { id: 17, label: "uLow" },
  { id: 18, label: "uVolume" },
  { id: 19, label: "fOpen" },
  { id: 20, label: "fClose" },
  { id: 21, label: "fHigh" },
  { id: 22, label: "fLow" },
  { id: 23, label: "fVolume" },
  { id: 24, label: "label" },
  { id: 25, label: "change" },
  { id: 26, label: "changePercent" },
];

const convertDate = (time) => {
  const date = new Date(time);
  return date.toLocaleString();
};
export const TableStocks = () => {
  const page = useSelector((state) => state.activePage);
  const stocks = useSelector((state) => state.stocksList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStocksList());
  }, [dispatch, page]);

  const handleChangePage = (_, newPage) => {
    dispatch(switchPage(newPage));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      stocks,
      result.source.index,
      result.destination.index
    );
    dispatch(updateStocksList(items));
  };

  return (
    <div className="tableNews">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align="center" key={column?.id}>
                  {column?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="table">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {stocks?.map((item, index) => (
                    <Draggable
                      key={`${item?.marketChangeOverTime}`}
                      draggableId={`${item?.close}-${item?.low}`}
                      index={index}
                    >
                      {(provided) => (
                        <TableRow
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TableCell align="center">{item?.close}</TableCell>
                          <TableCell align="center">{item?.high}</TableCell>
                          <TableCell align="center">{item?.low}</TableCell>
                          <TableCell align="center">{item?.open}</TableCell>
                          <TableCell align="center">
                            {item?.priceDate}
                          </TableCell>
                          <TableCell align="center">{item?.symbol}</TableCell>
                          <TableCell align="center">{item?.volume}</TableCell>
                          <TableCell align="center">{item?.id}</TableCell>
                          <TableCell>{item?.key}</TableCell>
                          <TableCell>{item?.date}</TableCell>
                          <TableCell>{convertDate(item?.updated)}</TableCell>
                          <TableCell align="center">
                            {item?.changeOverTime}
                          </TableCell>
                          <TableCell align="center">
                            {item?.marketChangeOverTime}
                          </TableCell>
                          <TableCell>{item?.uOpen}</TableCell>
                          <TableCell align="center">{item?.uClose}</TableCell>
                          <TableCell align="center">{item?.uHigh}</TableCell>
                          <TableCell align="center">{item?.uLow}</TableCell>
                          <TableCell align="center">{item?.uVolume}</TableCell>
                          <TableCell align="center">{item?.fOpen}</TableCell>
                          <TableCell align="center">{item?.fClose}</TableCell>
                          <TableCell align="center">{item?.fHigh}</TableCell>
                          <TableCell align="center">{item?.fLow}</TableCell>
                          <TableCell align="center">{item?.fVolume}</TableCell>
                          <TableCell align="center">{item?.label}</TableCell>
                          <TableCell align="center">{item?.change}</TableCell>
                          <TableCell align="center">
                            {item?.changePercent}
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={FAKE_NEWS_COUNT}
        page={page}
        rowsPerPage={10}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};
