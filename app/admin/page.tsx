'use client';

import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";
import { ChevronDown, Search1 } from "@tailgrids/icons";
import { Bell, Plus } from "lucide-react";
import { Kanit } from "next/font/google";
import { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";
import { cctv, cctvType } from "@/data/cctv";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose
} from "@/components/tailgrids/core/dialog";
import { TextField } from "@/components/tailgrids/core/text-field";
import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/tailgrids/core/select";


const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ['300', '400', '500', '600', '700'],
})

export default function EquipmentPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState("all");


  const [cameras, setCameras] = useState<cctvType[]>(cctv);
  const filteredCameras = cameras.filter((camera) => {
    const matchStatus =
      activeFilter === "all" || camera.status === activeFilter;
    const matchSearch =
      camera.branch.toLowerCase().includes(search.toLowerCase()) ||
      camera.name.toLowerCase().includes(search.toLowerCase()) ||
      camera.sn.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;


  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 12;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCameras.length / itemPerPage)
  );
  const startIndex = (currentPage - 1) * itemPerPage;
  const paginatedCameras = filteredCameras.slice(
    startIndex,
    startIndex + itemPerPage
  );


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const filters = [
    { label: "ทั้งหมด", value: "all", count: cameras.length },
    {
      label: "ออนไลน์",
      value: "online",
      count: cameras.filter((camera) => camera.status === "online").length
    },
    {
      label: "ออฟไลน์",
      value: "offline",
      count: cameras.filter((camera) => camera.status === "offline").length
    },
  ];
  const newCam = () => {
    const nameDom = document.getElementById('name') as HTMLInputElement;
    const snDom = document.getElementById('sn') as HTMLInputElement;
    const branchDom = document.getElementById('branch') as HTMLInputElement;

    const newId = Math.max(...cameras.map((camera) => camera.id), 0) + 1;

    const newCamera: cctvType = {
      id: newId,
      name: nameDom.value.trim(),
      sn: snDom.value.trim(),
      branch: branch.trim(),
      status: 'online'
    };

    if (!newCamera.name || !newCamera.sn || !newCamera.branch) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (!/^[A-Z0-9]{15}$/.test(snDom.value.trim())) {
      alert("Serial Number ใช้เฉพาะ A-Z และ 0-9");
      return;
    }
    setCameras((prev) => [...prev, newCamera]);

    setCurrentPage(Math.ceil((filteredCameras.length + 1) / itemPerPage));

    nameDom.value = '';
    snDom.value = '';
    setBranch("");
  };
  const [selected, setSelected] = useState("");
  const [branch, setBranch] = useState("");


  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeFilter]);

  return (
    <div>
      <div>
        <main className="flex-1 min-w-0 p-6 bg-[#211778] border w-full">
          <div className="flex items-center justify-between gap-4">
            <h1 className={`${kanit.className} text-2xl font-medium text-white`}>
              อุปกรณ์
            </h1>
            <div className="flex items-center gap-3">

              <div className="w-80">
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <Search1 className="size-4.5" />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="ค้นหาสาขา หรือชื่อกล้อง"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </div>

              <button className="flex size-10 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-[#292253] text-white transition hover:bg-[#393080]">
                <Bell size={18} />
              </button>

            </div>
          </div>
          <div className="flex justify-between">
            <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#100D35] p-1 ">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm transition-all
                  ${activeFilter === filter.value
                      ? "bg-white text-[#17123D] font-semibold"
                      : "text-violet-200 hover:bg-white/10"
                    }`}
                >
                  {filter.label} {filter.count}
                </button>

              ))}
            </div>
            <div className="mt-4">
              <OverlayWrapper>
                <Button className='bg-[#6CF2B6] text-black'>
                  <Plus />เพิ่มกล้อง
                </Button>

                <Backdrop>
                  <Dialog>
                    <DialogHeader>
                      <DialogTitle>Add Camera</DialogTitle>
                    </DialogHeader>

                    <DialogBody>
                      <form className="flex flex-col gap-4">
                        <TextField className="flex flex-col gap-1.5">
                          <Label>ID</Label>
                          <Input
                            placeholder="LOCKED"
                            className="w-full pointer-event-none bg-gray-900"
                            value={cctv.reduce((p, t) => (t.id > p ? t.id : p), -1) + 1}
                          />
                        </TextField>

                        <TextField className="flex flex-col gap-1.5">
                          <Label>Name</Label>
                          <Input
                            autoFocus
                            placeholder="ใส่ชื่อ"
                            className="w-full"
                            id='name'
                          />
                        </TextField>

                        <TextField className="flex flex-col gap-1.5">
                          <Label>Serial number</Label>
                          <Input
                            placeholder="ใส่ Serial number 15 หลัก"
                            className="w-full"
                            id='sn'
                            maxLength={15}

                          />
                        </TextField>
                        <TextField className="flex flex-col gap-1.5">
                          <Label>Branch</Label>
                          <div className="w-full">
                            <Select
                              placeholder="เลือกสาขา"
                              value={branch}
                              onChange={(value) => setBranch(String(value))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                                <SelectIndicator />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem id="สาขาสยาม" textValue="สาขาสยาม">
                                  สาขาสยาม
                                </SelectItem>

                                <SelectItem id="สาขาอโศก" textValue="สาขาอโศก">
                                  สาขาอโศก
                                </SelectItem>

                                <SelectItem id="สาขาลาดพร้าว" textValue="สาขาลาดพร้าว">
                                  สาขาลาดพร้าว
                                </SelectItem>

                                <SelectItem id="สาขาบางนา" textValue="สาขาบางนา">
                                  สาขาบางนา
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TextField>
                      </form>
                    </DialogBody>

                    <DialogFooter>
                      <DialogClose appearance="outline">Cancel</DialogClose>
                      <DialogClose onClick={newCam}>Save</DialogClose>
                    </DialogFooter>
                  </Dialog>
                </Backdrop>
              </OverlayWrapper>
            </div>
          </div>

          <div className="w-full mt-4">
            <TableRoot>
              <TableHeader>
                <TableRow className=" bg-[#211778] [&>th]:text-text-50 ">
                  <TableHead scope="col">ชื่อกล้อง</TableHead>
                  <TableHead scope="col">สาขา</TableHead>
                  <TableHead scope="col">สถานะ</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedCameras.map((camera) => (
                  <TableRow key={camera.id}>
                    <TableCell>
                      {camera.name}
                    </TableCell>

                    <TableCell>
                      {camera.branch}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${camera.status === "online"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {camera.status === "online" ? "ออนไลน์" : "ออฟไลน์"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredCameras.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      ไม่พบข้อมูลกล้อง
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableRoot>
          </div>
          <div className="mt-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}