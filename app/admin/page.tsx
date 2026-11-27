'use client';

import { useEffect, useState } from "react";
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
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";
import type { Camera, Branch } from "@/lib/cameras";
import { BRANCH_LABEL } from "@/lib/cameras";
import { getCameras, saveCameras } from "@/lib/cameraStorage";
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

  const [cameras, setCameras] = useState<Camera[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCameras(getCameras());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      saveCameras(cameras);
    }
  }, [cameras, ready]);


  const filteredCameras = cameras.filter((camera) => {
    const matchStatus =
      activeFilter === "all" || camera.status === activeFilter;
    const matchSearch =
      camera.branch.toLowerCase().includes(search.toLowerCase()) ||
      camera.name.toLowerCase().includes(search.toLowerCase()) ||
      camera.serialNumber.toLowerCase().includes(search.toLowerCase());

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

  const nextNumber =
    cameras.reduce((max, camera) => {
      const number = Number(camera.id.split('-')[1]) || 0;
      return Math.max(max, number);
    }, 0) + 1;

  const newCamera: Camera = {
    id: `cam-${String(nextNumber).padStart(2, '0')}`,
    name: nameDom.value.trim(),
    serialNumber: snDom.value.trim(),
    branch: branch as Branch,
    snapshot: `/cameras/cam-${String(nextNumber).padStart(2, '0')}.jpg`,
    status: 'offline',
  };

  if (!newCamera.name || !newCamera.serialNumber || !newCamera.branch) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  if (!/^[A-Z0-9]{15}$/.test(newCamera.serialNumber)) {
    alert("Serial Number ใช้เฉพาะ A-Z และ 0-9");
    return;
  }

  if (cameras.some((camera) => camera.serialNumber === newCamera.serialNumber)) {
    alert("Serial Number นี้มีอยู่แล้ว");
    return;
  }

  setCameras((prev) => [...prev, newCamera]);

  nameDom.value = '';
  snDom.value = '';
  setBranch('');
};

  const toggleStatus = (id: string) => {
    setCameras((prev) =>
      prev.map((camera) =>
        camera.id === id
          ? {
            ...camera,
            status: camera.status === "online" ? "offline" : "online",
          }
          : camera
      )
    );
  };

  const [selected, setSelected] = useState("");
  const [branch, setBranch] = useState("");


  useEffect(() => {
  if (ready) {
    saveCameras(cameras);
  }
}, [cameras, ready]);


  useEffect(() => {
    setCameras(getCameras());
  }, []);

  useEffect(() => {
    if (cameras.length > 0) {
      saveCameras(cameras);
    }
  }, [cameras]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeFilter]);

  return (
    <div>
      <div>
        <div className="min-w-0 w-full">
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
                            className="w-full bg-gray-900"
                            value={`cam-${String(cameras.length + 1).padStart(2, '0')}`}
                            readOnly
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
                                <SelectItem id="bangna" textValue="สาขาบางนา">
                                  สาขาบางนา
                                </SelectItem>

                                <SelectItem id="silom" textValue="สาขาสีลม">
                                  สาขาสีลม
                                </SelectItem>

                                <SelectItem id="rangsit" textValue="สาขารังสิต">
                                  สาขารังสิต
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
                      {BRANCH_LABEL[camera.branch]}
                    </TableCell>

                    <TableCell>
                      <button
                        onClick={() => toggleStatus(camera.id)}
                        className={`rounded-full px-3 py-1 text-xs transition hover:opacity-80 ${camera.status === "online"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {camera.status === "online" ? "ออนไลน์" : "ออฟไลน์"}
                      </button>
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
        </div>
      </div>
    </div>
  );
}