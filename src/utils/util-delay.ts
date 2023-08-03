/**
 *
 * @description
 * 특정 작업 실행 전에 일정 시간 기다리도록 하는 함수입니다.
 * 테스트 코드에서 요청 시간 등으로 인해 테스트가 실패할 경우 사용합니다.
 * @example
 * test("현재 나의 키워드 get 요청 테스트", async () => {
 *   render(
 *     <RootLayout>
 *       <Home />
 *     </RootLayout>,
 *   );
 *   await useDelay(100);
 *   const expectedItemCount = 14;
 *   const items = await screen.findAllByTestId(/myCategory/);
 *   expect(items.length).toBe(expectedItemCount);
 * });
 */

const utilDelay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export default utilDelay;
