# KARATS R20 / Fixed spatial input

Status: verified metric GLB and three camera renders of ONE scene. NOT final photography, NOT a completed Marble world, NOT a website release. Preview plant geometry and materials are spatial placeholders for Marble refinement. The original approved photographic reference remains the artistic target.

Interior:30×18×5.5m. Five exhibition zones8×6m (3+2), with a4m unobstructed aisle. Vehicle envelopes5.2×2.2m are shown ONLY on plan.png, not baked into the GLB. The pavilion itself is empty. Ten glazing bays on one long facade; fixed brand wall, side portal and opposite entrance. No independently generated view images.

Marble import:
1. Create → 3D input → Chisel / Start.
2. Upload Karats-R20-Chisel.glb. GLB contains metric geometry, garden and camera objects. Chisel acceptance and preservation of camera objects are NOT yet tested.
3. Check the whole room is inside the imported scene; compare with plan.png. Confirm floor30×18m and height5.5m if the UI exposes scale. Do not rescale casually.
4. Place Panorama Camera inside the room at eye height, looking toward the oak wall. The first source camera in glTF coordinates is X2.5,Y1.7,Z-5.5, target X26,Y2.3,Z-11.7. Blender uses Z-up, glTF uses Y-up; do not interchange coordinates. If Chisel applies centering or changes the axis convention, use the spatial plan rather than blindly entering these numbers.
5. Paste Marble-prompt.txt. Do not start any paid generation until cost is shown and authorized. Exact reproduction from geometry is NOT guaranteed; inspect the generated result.
6. Check glazing bay count, entrance, portal, wall arrangement and garden before recording. Obtain final viewpoints from the SAME accepted Marble world, not from independent image prompts.

Images01/02/03 are native1440×960 spatial previews from one Blender scene. They are NOT a maximum-quality photographic set and should not be substituted for the GLB upload. plan.png is a diagram, not an image-to-world input. 04-material-study.png is ONE AI photographic material/garden study derived from view01 plus the approved appearance reference. It is NOT a Marble result or a geometry certificate. Native1536×1024, requested high, provider reported low. Tree detail, floor finish and light differ from the blockout; do not treat the study as a calibrated additional camera.

Account check: Marble displayed Sign in in the connected browser. No stored login was available; secure login prompt is unavailable in this headless Telegram session. No login, subscription, upload or world generation was performed. Never send passwords or verification codes in chat.

Sources:
https://docs.worldlabs.ai/marble/create/chisel-tools/chisel-basics

Asset provenance: authored procedural geometry, lettering and materials. No third-party photographic tree assets, textures or HDRI are included in this GLB. Preview renders use Blender Nishita sky. Exhibit zones are dimensional design proposals, not a building-code, structural or vehicle-manoeuvring certification.
