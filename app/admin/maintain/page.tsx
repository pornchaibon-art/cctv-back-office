"use client";

import { cctv } from "@/data/cctv";
import { Bell } from "lucide-react";
import { Kanit } from "next/font/google";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { useState } from "react";
import { Button } from "@/components/tailgrids/core/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { TextField } from "@/components/tailgrids/core/text-field";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type IssueFilter = "all" | "SD Card" | "Cloud" | "No-Signal";



export default function Page() {
  const [activeFilter, setActiveFilter] = useState<IssueFilter>("all");
  const problemCCTV = cctv.filter((camera) => {
    if (activeFilter === "all") {
      return (camera.issue?.length ?? 0) > 0;
    }

    return camera.issue?.includes(activeFilter) ?? false;
  });

  return (
    <div>
      <div>
        <div className="min-w-0 w-full">
          <div className="flex items-center justify-between gap-4">
            <h1
              className={`${kanit.className} text-2xl font-medium text-white`}
            >
              ดูแลอุปกรณ์
            </h1>
            <div className="flex items-center gap-3">
              <button
                className="flex size-10 shrink-0 items-center justify-center rounded-full 
                            border border-violet-500/30 bg-[#292253] text-white transition hover:bg-[#393080]"
              >
                <Bell size={18} />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#100D35] p-1">
              <button
                onClick={() => setActiveFilter("all")}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  activeFilter === "all"
                    ? "bg-white text-[#211778]"
                    : "text-white hover:bg-[#25205C]"
                }`}
              >
                ทั้งหมด ({cctv.filter((camera) => camera.issue?.length).length})
              </button>

              <button
                onClick={() => setActiveFilter("SD Card")}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  activeFilter === "SD Card"
                    ? "bg-white text-[#211778]"
                    : "text-white hover:bg-[#25205C]"
                }`}
              >
                SD card (
                {
                  cctv.filter((camera) => camera.issue?.includes("SD Card"))
                    .length
                }
                )
              </button>

              <button
                onClick={() => setActiveFilter("Cloud")}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  activeFilter === "Cloud"
                    ? "bg-white text-[#211778]"
                    : "text-white hover:bg-[#25205C]"
                }`}
              >
                Cloud (
                {
                  cctv.filter((camera) => camera.issue?.includes("Cloud"))
                    .length
                }
                )
              </button>

              <button
                onClick={() => setActiveFilter("No-Signal")}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  activeFilter === "No-Signal"
                    ? "bg-white text-[#211778]"
                    : "text-white hover:bg-[#25205C]"
                }`}
              >
                No-Signal (
                {
                  cctv.filter((camera) => camera.issue?.includes("No-Signal"))
                    .length
                }
                )
              </button>
            </div>
          </div>
          <div className="mt-4">
            <TableRoot>
              <TableHeader>
                <TableRow className=" bg-[#211778] [&>th]:text-text-50 ">
                  <TableHead scope="col">ชื่อกล้อง</TableHead>
                  <TableHead scope="col">สาขา</TableHead>
                  <TableHead scope="col">ปัญหา</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {problemCCTV.map((camera) => (
                  <TableRow key={camera.id}>
                    <TableCell>{camera.name}</TableCell>
                    <TableCell>{camera.branch}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          camera.issue?.includes("No-Signal")
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {camera.issue
                          ?.map((issue) => {
                            if (issue === "SD Card") return "SD card ผิดปกติ";
                            if (issue === "Cloud") return "Cloud ใกล้หมดอายุ";
                            if (issue === "No-Signal") return "No-Signal";
                            return issue;
                          })
                          .join(", ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <OverlayWrapper>
                        <Button
                          size="xs"
                          appearance={"outline"}
                          className="bg-[#211778] text-green-400"
                        >
                          {" "}
                          Send Report
                        </Button>

                        <Backdrop>
                          <Dialog>
                            <DialogHeader>
                              <DialogTitle>Report</DialogTitle>
                            </DialogHeader>

                            <DialogBody>
                              <form className="flex flex-col gap-4">
                                <TextField className="flex flex-col gap-1.5">
                                  <Input
                                    placeholder={camera.name}
                                    disabled
                                    className="w-full"
                                    autoFocus
                                  />
                                </TextField>

                                <TextField className="flex flex-col gap-1.5">
                                  <Input
                                    placeholder={camera.sn}
                                    disabled
                                    className="w-full"
                                  />
                                </TextField>

                                <TextField className="flex flex-col gap-1.5">
                                  <Input
                                    placeholder={camera.branch}
                                    disabled
                                    className="w-full"
                                  />
                                </TextField>

                                <TextField className="flex flex-col gap-1.5">
                                  <Input
                                    placeholder={camera.issue?.join(", ")}
                                    disabled
                                    className="w-full"
                                  />
                                </TextField>
                              </form>
                            </DialogBody>

                            <DialogFooter>
                              <DialogClose appearance="outline">
                                Cancel
                              </DialogClose>
                              <DialogClose>Send Report</DialogClose>
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
        </div>
      </div>
    </div>
  );
}
