import { isMobile } from '../utils/is-mobile';

export function MobileButtons() {
  if (!isMobile.any()) {
    return;
  }
  return (
    <div className="fixed bottom-0 z-50">
      <div id="cross-buttons" className="fixed bottom-8 left-8">
        <div className="relative flex w-40 h-40 p-4 mt-4">
          <button
            type="button"
            className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[35px] border-solid border-l-transparent border-r-transparent border-b-white  bg-no-repeat bg-contain absolute top-2 left-1/2 -translate-x-1/2"
          />
          <button
            type="button"
            className="w-0 h-0 border-t-[25px] border-b-[25px] border-r-[35px] border-solid border-t-transparent border-b-transparent border-r-white bg-no-repeat bg-contain absolute left-2 top-1/2 -translate-y-1/2"
          />
          <button
            type="button"
            className="w-0 h-0 border-l-[25px] border-r-[25px] border-t-[35px] border-solid border-l-transparent border-r-transparent border-t-white bg-no-repeat bg-contain absolute bottom-2 left-1/2 -translate-x-1/2"
          />
          <button
            type="button"
            className="w-0 h-0 border-t-[25px] border-b-[25px] border-l-[35px] border-solid border-t-transparent border-b-transparent border-l-white bg-no-repeat bg-contain absolute right-2 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      {/* Interact button */}
      <div className="fixed right-8 bottom-8">
        <div className="">
          <button className="bg-white rounded-full w-28 h-28" />
        </div>
      </div>
    </div>
  );
}
