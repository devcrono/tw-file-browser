import { useMemo } from "react";

import ExactTrie from "exact-trie";
import { Nullable } from "tsdef";

import { FileData } from "@/types/file.types";
import { FbIconName } from "./enums";

export const VideoExtensions: string[] = [
  "3g2",
  "3gp",
  "3gpp",
  "asf",
  "asx",
  "avi",
  "dvb",
  "f4v",
  "fli",
  "flv",
  "fvt",
  "h261",
  "h263",
  "h264",
  "jpgm",
  "jpgv",
  "jpm",
  "m1v",
  "m2v",
  "m4u",
  "m4v",
  "mj2",
  "mjp2",
  "mk3d",
  "mks",
  "mkv",
  "mng",
  "mov",
  "movie",
  "mp4",
  "mp4v",
  "mpe",
  "mpeg",
  "mpg",
  "mpg4",
  "mxu",
  "ogv",
  "pyv",
  "qt",
  "smv",
  "ts",
  "uvh",
  "uvm",
  "uvp",
  "uvs",
  "uvu",
  "uvv",
  "uvvh",
  "uvvm",
  "uvvp",
  "uvvs",
  "uvvu",
  "uvvv",
  "viv",
  "vob",
  "webm",
  "wm",
  "wmv",
  "wmx",
  "wvx",
];
export const ImageExtensions: string[] = [
  "3ds",
  "apng",
  "azv",
  "bmp",
  "bmp",
  "btif",
  "cgm",
  "cmx",
  "djv",
  "djvu",
  "drle",
  "dwg",
  "dxf",
  "emf",
  "exr",
  "fbs",
  "fh",
  "fh4",
  "fh5",
  "fh7",
  "fhc",
  "fits",
  "fpx",
  "fst",
  "g3",
  "gif",
  "heic",
  "heics",
  "heif",
  "heifs",
  "ico",
  "ico",
  "ief",
  "jls",
  "jng",
  "jp2",
  "jpe",
  "jpeg",
  "jpf",
  "jpg",
  "jpg2",
  "jpm",
  "jpx",
  "jxr",
  "ktx",
  "mdi",
  "mmr",
  "npx",
  "pbm",
  "pct",
  "pcx",
  "pcx",
  "pgm",
  "pic",
  "png",
  "pnm",
  "ppm",
  "psd",
  "pti",
  "ras",
  "rgb",
  "rlc",
  "sgi",
  "sid",
  "sub",
  "svg",
  "svgz",
  "t38",
  "tap",
  "tfx",
  "tga",
  "tif",
  "tiff",
  "uvg",
  "uvi",
  "uvvg",
  "uvvi",
  "vtf",
  "wbmp",
  "wdp",
  "webp",
  "wmf",
  "xbm",
  "xif",
  "xpm",
  "xwd",
];
export const AudioExtensions: string[] = [
  "3gpp",
  "aac",
  "adp",
  "aif",
  "aifc",
  "aiff",
  "au",
  "caf",
  "dra",
  "dts",
  "dtshd",
  "ecelp4800",
  "ecelp7470",
  "ecelp9600",
  "eol",
  "flac",
  "kar",
  "lvp",
  "m2a",
  "m3a",
  "m3u",
  "m4a",
  "m4a",
  "mid",
  "midi",
  "mka",
  "mp2",
  "mp2a",
  "mp3",
  "mp3",
  "mp4a",
  "mpga",
  "oga",
  "ogg",
  "pya",
  "ra",
  "ra",
  "ram",
  "rip",
  "rmi",
  "rmp",
  "s3m",
  "sil",
  "snd",
  "spx",
  "uva",
  "uvva",
  "wav",
  "wav",
  "wav",
  "wax",
  "weba",
  "wma",
  "xm",
];
export const ColorsLight = [
  "#bbbbbb",
  "#d65c5c",
  "#d6665c",
  "#d6705c",
  "#d67a5c",
  "#d6855c",
  "#d68f5c",
  "#d6995c",
  "#d6a35c",
  "#d6ad5c",
  "#d6b85c",
  "#d6c25c",
  "#d6cc5c",
  "#d6d65c",
  "#ccd65c",
  "#c2d65c",
  "#b8d65c",
  "#add65c",
  "#a3d65c",
  "#99d65c",
  "#8fd65c",
  "#85d65c",
  "#7ad65c",
  "#70d65c",
  "#66d65c",
  "#5cd65c",
  "#5cd666",
  "#5cd670",
  "#5cd67a",
  "#5cd685",
  "#5cd68f",
  "#5cd699",
  "#5cd6a3",
  "#5cd6ad",
  "#5cd6b8",
  "#5cd6c2",
  "#5cd6cc",
  "#5cd6d6",
  "#5cccd6",
  "#5cc2d6",
  "#5cb8d6",
  "#5cadd6",
  "#5ca3d6",
  "#5c99d6",
  "#5c8fd6",
  "#5c85d6",
  "#5c7ad6",
  "#5c70d6",
  "#5c66d6",
  "#5c5cd6",
  "#665cd6",
  "#705cd6",
  "#7a5cd6",
  "#855cd6",
  "#8f5cd6",
  "#995cd6",
  "#a35cd6",
  "#ad5cd6",
  "#b85cd6",
  "#c25cd6",
  "#cc5cd6",
  "#d65cd6",
  "#d65ccc",
  "#d65cc2",
  "#d65cb8",
  "#d65cad",
  "#d65ca3",
  "#d65c99",
  "#d65c8f",
  "#d65c85",
  "#d65c7a",
  "#d65c70",
  "#d65c66",
];

const getIconTrie = () => {
  let colourIndex = 0;
  const step = 5;

  const IconsToExtensions = [
    // Generic file types
    [FbIconName.license, ["license"]],
    [FbIconName.config, ["sfk", "ini", "yml", "toml", "iml"]],
    [FbIconName.model, ["3ds", "obj", "ply", "fbx"]],
    [
      FbIconName.database,
      [
        "csv",
        "json",
        "sql",
        "sqlite",
        "sqlite3",
        "npy",
        "npz",
        "rec",
        "idx",
        "hdf5",
      ],
    ],
    [FbIconName.text, ["txt", "md", "mdx"]],
    [FbIconName.archive, ["zip", "rar", "tar", "tar.gz", "7z"]],
    [FbIconName.image, ImageExtensions],
    [FbIconName.video, VideoExtensions],
    [
      FbIconName.code,
      [
        "html",
        "php",
        "css",
        "sass",
        "scss",
        "less",
        "cpp",
        "h",
        "hpp",
        "c",
        "xml",
      ],
    ],
    [FbIconName.info, ["bib", "readme", "nfo"]],
    [FbIconName.key, ["pem", "pub"]],
    [FbIconName.lock, ["lock", "lock.json", "shrinkwrap.json"]],
    [FbIconName.music, AudioExtensions],
    [FbIconName.terminal, ["run", "sh"]],
    [FbIconName.trash, [".Trashes"]],
    [FbIconName.users, ["authors", "contributors"]],

    // OS file types
    [FbIconName.linux, ["AppImage"]],
    [FbIconName.ubuntu, ["deb"]],
    [FbIconName.windows, ["exe"]],

    // Programming language file types
    [FbIconName.rust, ["rs", "rlib"]],
    [FbIconName.python, ["py", "ipynb"]],
    [FbIconName.nodejs, ["js", "jsx", "ts", "tsx", "d.ts"]],
    [FbIconName.php, ["php"]],

    // Development tools file types
    [FbIconName.git, [".gitignore"]],

    // Other program file types
    [FbIconName.pdf, ["pdf"]],
    [FbIconName.excel, ["xls", "xlsx"]],
    [FbIconName.word, ["doc", "docx", "odt"]],
    [FbIconName.flash, ["swf"]],
  ] as const;

  const exactTrie = new ExactTrie({ ignoreCase: true });
  for (const pair of IconsToExtensions) {
    const [icon, extensions] = pair;

    for (let i = 0; i < extensions.length; ++i) {
      colourIndex += step;
      const colorCode = (colourIndex % (ColorsLight.length - 1)) + 1;
      const iconData = {
        icon,
        colorCode,
      };
      exactTrie.put(extensions[i], iconData, true);
    }
  }

  return exactTrie;
};

const iconTrie = getIconTrie();

export const useIconData = (file: Nullable<FileData>) => {
  return useMemo(() => {
    if (!file) return { icon: FbIconName.loading, colorCode: 0 };
    if (file.isDir === true) return { icon: FbIconName.folder, colorCode: 0 };

    const match = iconTrie.getWithCheckpoints(file.name, ".", true);
    return match ? match : { icon: FbIconName.file, colorCode: 32 };
  }, [file]);
};
