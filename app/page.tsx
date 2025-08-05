"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ScanBarcode } from "lucide-react"

// ダミーの在庫データ
const dummyStockData = [
  {
    manufacturerName: "ABC製薬",
    manufacturerCode: "M001",
    productName: "消毒用エタノールIP",
    janCode: "4901234567890",
    availableStock: 150,
    allocatedStock: 20,
  },
  {
    manufacturerName: "XYZ医療機器",
    manufacturerCode: "M002",
    productName: "N95マスク",
    janCode: "4509876543210",
    availableStock: 80,
    allocatedStock: 10,
  },
  {
    manufacturerName: "ABC製薬",
    manufacturerCode: "M001",
    productName: "医療用綿棒",
    janCode: "4901122334455",
    availableStock: 200,
    allocatedStock: 30,
  },
  {
    manufacturerName: "PQRヘルスケア",
    manufacturerCode: "M003",
    productName: "非接触体温計",
    janCode: "4700000000001",
    availableStock: 50,
    allocatedStock: 5,
  },
  {
    manufacturerName: "XYZ医療機器",
    manufacturerCode: "M002",
    productName: "サージカルグローブ",
    janCode: "4509988776655",
    availableStock: 120,
    allocatedStock: 15,
  },
  {
    manufacturerName: "ABC製薬",
    manufacturerCode: "M001",
    productName: "ポビドンヨード液",
    janCode: "4901234567891",
    availableStock: 90,
    allocatedStock: 10,
  },
]

export default function Component() {
  const [manufacturerCode, setManufacturerCode] = useState("")
  const [productName, setProductName] = useState("")
  const [barcodeInput, setBarcodeInput] = useState("") // JANコード読み取りで設定される値
  const [searchResults, setSearchResults] = useState<typeof dummyStockData>([])

  const handleSearch = () => {
    let filteredData = dummyStockData

    if (barcodeInput) {
      // バーコード入力がある場合はJANコードで完全一致検索
      filteredData = filteredData.filter((item) => item.janCode === barcodeInput)
    } else {
      // バーコード入力がない場合はメーカーコードと商品名で検索
      if (manufacturerCode) {
        filteredData = filteredData.filter((item) => item.manufacturerCode === manufacturerCode)
      }
      if (productName) {
        filteredData = filteredData.filter((item) => item.productName.includes(productName)) // 商品名は部分一致
      }
    }
    setSearchResults(filteredData)
  }

  // バーコード読み取りのシミュレーション
  const handleBarcodeScan = () => {
    // 実際のバーコードリーダー連携は、デバイスのAPIや外部ライブラリに依存します。
    // ここでは、promptを使ってダミーのバーコード値を入力するシミュレーションを行います。
    const scannedBarcode = prompt("バーコードリーダーでスキャンしたJANコードを入力してください (例: 4901234567890)")
    if (scannedBarcode) {
      setBarcodeInput(scannedBarcode)
      // スキャン後、自動的に検索を実行したい場合は以下のコメントを解除
      // handleSearch();
    }
  }

  return (
    <div
      className="flex flex-col border border-gray-300 shadow-lg"
      style={{ width: "480px", height: "800px", backgroundColor: "#FAF5E9" }}
    >
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">在庫確認</h1>
      </header>

      {/* Search Conditions */}
      <div className="p-4 space-y-4 flex-grow overflow-auto">
        <div className="grid gap-2">
          <Label htmlFor="manufacturerCode">メーカーコード</Label>
          <Input
            id="manufacturerCode"
            value={manufacturerCode}
            onChange={(e) => setManufacturerCode(e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productName">商品名</Label>
          <Input
            id="productName"
            placeholder="部分一致"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-white"
          />
        </div>
        <Button onClick={handleSearch} className="w-full">
          <Search className="h-4 w-4 mr-2" />
          検索
        </Button>
        <Button onClick={handleBarcodeScan} className="w-full mt-4 bg-white text-blue-600">
          {" "}
          {/* 背景色を白に、文字色を青に設定 */}
          <ScanBarcode className="h-4 w-4 mr-2" />
          JANコード読み取り
        </Button>

        {/* Stock Information Display */}
        {searchResults.length > 0 && (
          <div className="mt-6 border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>メーカー名</TableHead>
                  <TableHead>メーカーコード</TableHead>
                  <TableHead>商品名</TableHead>
                  <TableHead>JANコード</TableHead>
                  <TableHead className="text-right">有効在庫</TableHead>
                  <TableHead className="text-right">引当予定</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.manufacturerName}</TableCell>
                    <TableCell>{item.manufacturerCode}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.janCode}</TableCell>
                    <TableCell className="text-right">{item.availableStock}</TableCell>
                    <TableCell className="text-right">{item.allocatedStock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {searchResults.length === 0 && (manufacturerCode || productName || barcodeInput) && (
          <div className="text-center text-gray-500 mt-6">検索条件に一致する在庫情報はありません。</div>
        )}
      </div>
    </div>
  )
}
