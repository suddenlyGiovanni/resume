{
  description = "A flake for aarch64-darwin";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs = { self, nixpkgs }:
    let
      system = "aarch64-darwin";
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.aarch64-darwin.default = pkgs.mkShell {
        packages = with pkgs; [
          biome
          deno
        ];
        shellHook = ''
          echo "Nix dev env!"
          echo "Deno 🦕 version: $(deno -V)"
        '';
      };
    };
}
