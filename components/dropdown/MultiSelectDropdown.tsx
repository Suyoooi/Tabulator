import React, { useState, ChangeEvent } from "react";

// 임시 서버 목록 데이터 인터페이스
interface Server {
  id: number;
  name: string;
}

const serverList: Server[] = [
  { id: 1, name: "EMS1" },
  { id: 2, name: "EMS2" },
  { id: 3, name: "EMS3" },
  { id: 4, name: "EMS4" },
];

const MultiSelectDropdown: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedServers, setSelectedServers] = useState<Server[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleServer = (server: Server) => {
    const selectedIndex = selectedServers.findIndex(
      (selectedServer) => selectedServer.id === server.id
    );

    if (selectedIndex === -1) {
      setSelectedServers([...selectedServers, server]);
    } else {
      const updatedServers = [...selectedServers];
      updatedServers.splice(selectedIndex, 1);
      setSelectedServers(updatedServers);
    }
  };

  const handleConfirm = () => {
    // 선택한 서버 목록을 Text로 표시하거나 다른 액션 수행
    const selectedServerNames = selectedServers.map((server) => server.name);
    const message =
      selectedServerNames.length > 0
        ? `Selected servers: ${selectedServerNames.join(", ")}`
        : "No servers selected";

    alert(message);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search servers..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleConfirm}>확인</button>
      <button onClick={() => setSelectedServers([])}>취소</button>

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
                  checked={selectedServers.some(
                    (selectedServer) => selectedServer.id === server.id
                  )}
                  onChange={() => handleToggleServer(server)}
                />
                {server.name}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MultiSelectDropdown;
