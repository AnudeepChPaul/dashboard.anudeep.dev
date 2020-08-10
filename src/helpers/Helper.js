export const uniqueId = function uid() {
  function chr4() {
    return Math.random().toString(16).substr(2);
  }
  return `${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}`;
};

// export const enhanceObjectProto = () => {
//   Object.prototype.uid = uniqueId;
// };

// export const removeExtendedProto = () => {
//   Object.prototype.uid = null;
// };
