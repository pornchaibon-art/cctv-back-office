'use client';

import { useState } from "react";
import { Button } from "@/components/tailgrids/core/button";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";
import { Bell, ImagePlus, Plus, X } from "lucide-react";
import { Kanit } from "next/font/google";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";
import { comments, Status, type Request, Topics } from "@/data/comments";
import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { Dialog, DialogBody, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/tailgrids/core/dialog";
import { Select, SelectContent, SelectIndicator, SelectItem, SelectTrigger } from "@/components/tailgrids/core/select";
import { SelectValue } from "react-aria-components";


const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ['300', '400', '500', '600', '700'],
})


export default function Page() {
  const [reports, setReports] = useState<Request[]>(comments)
  const [activeFilter, setActiveFilter] = useState("all");
  const [status, setStatus] = useState<Status>("รอดำเนินการ")

  const filteredReports = reports.filter((report) => {
    if (activeFilter === "all") return true;
    return report.status === activeFilter;
  });

  const statusList: Status[] = [
    "รอดำเนินการ",
    "กำลังดำเนินการ",
    "ดำเนินการแล้ว",
  ];

  const handleSave = (id: number, newStatus: Status) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id
          ? { ...report, status: newStatus }
          : report
      )
    );
  };


  return (
    <div>
      <div>
        <main className="flex-1 min-w-0 p-6 bg-[#211778] border w-full">
          <div className="flex items-center justify-between gap-4">
            <h1 className={`${kanit.className} text-2xl font-medium text-white`}>
              คำร้องทั้งหมด
            </h1>
            <div className="flex items-center gap-3">
              <button className="flex size-10 shrink-0 items-center justify-center rounded-full 
                                border border-violet-500/30 bg-[#292253] text-white transition hover:bg-[#393080]">
                <Bell size={18} />
              </button>
            </div>
          </div>
          <div className="w-full mt-4">

            <TableRoot>
              <TableHeader>
                <TableRow className=" bg-[#211778] [&>th]:text  ">
                  <TableHead scope="col">ลำดับ</TableHead>
                  <TableHead scope="col">หัวข้อปัญหา</TableHead>
                  <TableHead scope="col">ประเภท</TableHead>
                  <TableHead scope="col">สถานะ</TableHead>
                  <TableHead scope="col">วันที่ส่งคำร้อง</TableHead>
                  <TableHead scope="col">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredReports.map((report, index) => (
                  <TableRow key={report.id}>

                    {/* ลำดับ */}
                    <TableCell>
                      {index + 1}
                    </TableCell>

                    {/* หัวข้อปัญหา */}
                    <TableCell>
                      {report.title}
                    </TableCell>

                    {/* ประเภท */}
                    <TableCell>
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-700 text-sm">
                        {report.topics}
                      </span>
                    </TableCell>

                    {/* สถานะ */}
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${report.status === "รอดำเนินการ"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : report.status === "กำลังดำเนินการ"
                            ? "bg-blue-500/20 text-blue-400"
                            : report.status === "ดำเนินการแล้ว"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                      >
                        {report.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      {report.date}
                    </TableCell>

                    <TableCell>
                      <OverlayWrapper>
                        <Button
                          appearance="outline"
                          size="sm"
                          onClick={() => setStatus(report.status)}
                        >
                          UPDATE
                        </Button>
                        <Backdrop>
                          <Dialog>
                            <DialogHeader>
                              <DialogTitle>UPDATE</DialogTitle>
                            </DialogHeader>

                            <DialogBody>
                              <form className="flex flex-col gap-4">
                                <TextField className="flex flex-col gap-1.5">
                                  <Input
                                    aria-label="หัวข้อปัญหา"
                                    placeholder={report.title}
                                    disabled
                                    className="w-full font-bold"
                                  />
                                </TextField>

                                <TextField className="flex flex-col gap-1.5">
                                  <Select
                                    aria-label="สถานะคำร้อง"
                                    placeholder={report.status}
                                    className="w-full"
                                    onChange={(value) => {
                                      if (value) setStatus(value as Status);
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                      <SelectIndicator />
                                    </SelectTrigger>

                                    <SelectContent>
                                      {statusList.map((item) => (
                                        <SelectItem key={item} id={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </TextField>

                                <TextField className="flex flex-col gap-1.5">
                                  <Label>Reply</Label>
                                  <TextArea
                                    rows={3}
                                    placeholder='ข้อความตอบกลับ'
                                    className="w-full"
                                  />
                                </TextField>
                              </form>
                            </DialogBody>

                            <DialogFooter>
                              <DialogClose
                                variant="success"
                                className="mr-25"
                                onClick={() => handleSave(report.id, "ส่งต่อถึง Dev")}
                              >
                                ส่งให้ SuperAdmin
                              </DialogClose>
                              <DialogClose appearance="outline">Cancel</DialogClose>
                              <DialogClose onClick={() => handleSave(report.id ,status)}>
                                Save Changes
                              </DialogClose>
                            </DialogFooter>
                          </Dialog>
                        </Backdrop>
                      </OverlayWrapper>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </TableRoot>
          </div>
        </main>
      </div>
    </div>
  )
}