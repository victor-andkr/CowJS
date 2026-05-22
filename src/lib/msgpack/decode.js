const decode = function (r) {
  const e = 4294967296;
  let t = 0;
  if (r instanceof ArrayBuffer) r = new Uint8Array(r);
  if (typeof r != "object" || r.length === undefined)
    throw new Error("Expected byte array to deserialize.");
  if (!r.length) throw new Error("Empty MessagePack buffer.");
  r instanceof Uint8Array || (r = new Uint8Array(r));
  return i();

  function i() {
    const e = r[t++];
    if (e >= 0 && e <= 127) return e;
    if (e >= 128 && e <= 143) return l(e - 128);
    if (e >= 144 && e <= 159) return c(e - 144);
    if (e >= 160 && e <= 191) return d(e - 160);
    if (192 === e) return null;
    if (193 === e) throw new Error("Invalid byte code 0xc1.");
    if (194 === e) return !1;
    if (195 === e) return !0;
    if (196 === e) return a(-1, 1);
    if (197 === e) return a(-1, 2);
    if (198 === e) return a(-1, 4);
    if (199 === e) return w(-1, 1);
    if (200 === e) return w(-1, 2);
    if (201 === e) return w(-1, 4);
    if (202 === e) return u(4);
    if (203 === e) return u(8);
    if (204 === e) return o(1);
    if (205 === e) return o(2);
    if (206 === e) return o(4);
    if (207 === e) return o(8);
    if (208 === e) return f(1);
    if (209 === e) return f(2);
    if (210 === e) return f(4);
    if (211 === e) return f(8);
    if (212 === e) return w(1);
    if (213 === e) return w(2);
    if (214 === e) return w(4);
    if (215 === e) return w(8);
    if (216 === e) return w(16);
    if (217 === e) return d(-1, 1);
    if (218 === e) return d(-1, 2);
    if (219 === e) return d(-1, 4);
    if (220 === e) return c(-1, 2);
    if (221 === e) return c(-1, 4);
    if (222 === e) return l(-1, 2);
    if (223 === e) return l(-1, 4);
    if (e >= 224 && e <= 255) return e - 256;
    throw new Error("Invalid msgpack byte at index " + (t - 1));
  }

  function f(e) {
    let n = 0,
      i = !0;
    for (; e-- > 0; )
      if (i) {
        let e = r[t++];
        (n += 127 & e), 128 & e && (n -= 128), (i = !1);
      } else (n *= 256), (n += r[t++]);
    return n;
  }

  function o(e) {
    let n = 0;
    for (; e-- > 0; ) (n *= 256), (n += r[t++]);
    return n;
  }

  function u(e) {
    let n = new DataView(r.buffer, t, e);
    return (t += e), 4 === e ? n.getFloat32(0, !1) : n.getFloat64(0, !1);
  }

  function a(e, n) {
    e < 0 && (e = o(n));
    let i = r.subarray(t, t + e);
    return (t += e), i;
  }

  function l(r, e) {
    r < 0 && (r = o(e));
    let t = {};
    for (; r-- > 0; ) t[i()] = i();
    return t;
  }

  function c(r, e) {
    r < 0 && (r = o(e));
    let t = [];
    for (; r-- > 0; ) t.push(i());
    return t;
  }

  function d(e, n) {
    e < 0 && (e = o(n));
    let i = t;
    t += e;
    let n0 = i,
      end = e + i,
      out = "";
    for (; n0 < end; ) {
      let ch = r[n0++];
      if (ch > 127) {
        if (ch > 191 && ch < 224) {
          if (n0 >= end) throw new Error("UTF-8: incomplete 2-byte");
          ch = ((31 & ch) << 6) | (63 & r[n0++]);
        } else if (ch > 223 && ch < 240) {
          if (n0 + 1 >= end) throw new Error("UTF-8: incomplete 3-byte");
          ch =
            ((15 & ch) << 12) | ((63 & r[n0++]) << 6) | (63 & r[n0++]);
        } else {
          if (!(ch > 239 && ch < 248)) throw new Error("UTF-8: bad start");
          if (n0 + 2 >= end) throw new Error("UTF-8: incomplete 4-byte");
          ch =
            ((7 & ch) << 18) |
            ((63 & r[n0++]) << 12) |
            ((63 & r[n0++]) << 6) |
            (63 & r[n0++]);
        }
      }
      if (ch <= 65535) out += String.fromCharCode(ch);
      else {
        ch -= 65536;
        out += String.fromCharCode((ch >> 10) | 55296, (1023 & ch) | 56320);
      }
    }
    return out;
  }

  function w(r, n) {
    r < 0 && (r = o(n));
    let i = o(1),
      u0 = a(r);
    if (255 === i) {
      if (4 === u0.length) {
        let e =
          (u0[0] << 24) + (u0[1] << 16) + (u0[2] << 8) + u0[3];
        return new Date(1000 * e);
      }
      if (8 === u0.length) {
        let t =
            (u0[0] << 22) + (u0[1] << 14) + (u0[2] << 6) + (u0[3] >>> 2),
          n =
            (3 & u0[3]) * e +
            (u0[4] << 24) +
            (u0[5] << 16) +
            (u0[6] << 8) +
            u0[7];
        return new Date(1000 * n + t / 1e6);
      }
    }
    return { type: i, data: u0 };
  }
};

export default decode;
