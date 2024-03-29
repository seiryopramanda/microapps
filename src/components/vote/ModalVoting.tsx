import React, { useEffect, useState } from "react";
import { getPaslon } from "../../services/paslon";
import IVotes from "../../interface/votes";

const ModalVoting: React.FC<any> = () => {
  const [showModal, setShowModal] = useState(false);
  const [paslons, setPaslons] = useState<IVotes[]>([]);

  useEffect(() => {
    const fetchPaslons = async () => {
      try {
        const response = await getPaslon();

        const sortedData = response.sort((a, b) => a.id - b.id);
        setPaslons(sortedData);

        setPaslons(response);
      } catch (error) {
        console.error("Error fetching paslons:", error);
      }
    };

    fetchPaslons();
  }, []);

  return (
    <>
      <button
        className="bg-[#5E5A00] text-3xl px-10 py-2 rounded-lg text-white font-semibold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        MASUKAN SUARAMU
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-filter backdrop-blur-sm bg-opacity-35 bg-black">
            <div className="relative w-auto mt-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <h3 className="text-4xl font-black text-center text-[#5E5400]">
                  MASUKAN PILIHAN MU
                </h3>
                <div className="relative p-6 flex flex-row gap-4">
                  {paslons.map((paslon, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full "
                        >
                          <div className="bg-center">
                            <img
                              src={paslon.image}
                              alt=""
                              className="h-[189px] w-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-col flex text-left mt-2">
                            <span className="text-[#5E5A00] text-lg font-semibold">
                              {paslon.name}
                            </span>
                            <span className="text-sm">
                              <ul className="list-disc ps-[40px]">
                                {Array.isArray(paslon.visimisi) ? (
                                  paslon.visimisi.map(
                                    (paslon: string, i: number) => (
                                      <li key={i}>{paslon}</li>
                                    )
                                  )
                                ) : (
                                  <li>{paslon.visimisi}</li>
                                )}
                              </ul>
                            </span>
                            <span className="text-sm font-semibold mt-4">
                              Partai Pengusung :
                            </span>
                            <span className="mt-2">
                              <ul className=" list-disc ps-[40px]">
                                {Array.isArray(paslon.koalisi) ? (
                                  paslon.koalisi.map(
                                    (paslon: string, i: number) => (
                                      <li key={i}>{paslon}</li>
                                    )
                                  )
                                ) : (
                                  <li>{paslon.koalisi}</li>
                                )}
                              </ul>
                            </span>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    className="text-[#5E5400] text-3xl border-2 rounded-lg border-[#5E5400] background-transparent font-bold uppercase px-24 py-2 outline-none focus:outline-none mr-1 mb-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    RESET
                  </button>
                  <button
                    className="text-white bg-[#5E5400] active:bg-#5E5400 font-bold uppercase text-3xl rounded-lg px-24 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalVoting;
