import React, { useState, ChangeEvent } from "react";

// 임시 서버 목록 데이터 인터페이스
interface Server {
  id: number;
  name: string;
  value: string;
}

const serverList: Server[] = [
  { id: 1, name: "EMS1", value: "EMS1" },
  { id: 2, name: "EMS2", value: "EMS2" },
  { id: 3, name: "EMS3", value: "EMS3" },
  { id: 4, name: "EMS4", value: "EMS4" },
];

const SingleSelectDropdown = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  // 검색기능
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectServer = (server: Server) => {
    setSelectedServer(server);
  };

  const handleConfirm = () => {
    // 선택한 서버를 SelectBox에 표시하거나 다른 액션 수행
    const selectedServerName = selectedServer
      ? selectedServer.name
      : "No server selected";
    alert(`Selected server: ${selectedServerName}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search servers"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleConfirm}>Apply</button>
      <button onClick={() => setSelectedServer(null)}>Cancle</button>

      <ul>
        {serverList
          .filter((server) =>
            server.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((server) => (
            <li key={server.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedServer?.id === server.id}
                  onChange={() => handleSelectServer(server)}
                />
                {server.name}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SingleSelectDropdown;
