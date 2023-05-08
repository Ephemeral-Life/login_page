import Index from "./page/index";
import Result from "./page/resultPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}